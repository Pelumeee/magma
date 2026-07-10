import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  turnstileToken: string;
  honeypot?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, service, message, turnstileToken, honeypot }: ContactPayload =
    req.body;

  if (honeypot) {
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!turnstileToken) {
    return res.status(400).json({ error: 'Missing captcha token' });
  }

  try {
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env['TURNSTILE_SECRET_KEY']!,
        response: turnstileToken,
      }),
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      console.error('Turnstile verification failed:', verifyData['error-codes']);
      return res.status(400).json({ error: 'Captcha verification failed' });
    }
  } catch (err) {
    console.error('Turnstile request error:', err);
    return res.status(502).json({ error: 'Captcha verification unavailable' });
  }

  try {
    const mailjetRes = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env['MJ_APIKEY_PUBLIC']}:${process.env['MJ_APIKEY_PRIVATE']}`,
          ).toString('base64'),
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: process.env['MJ_FROM_ADDRESS'],
              Name: 'Magma Tech Services Nigeria Ltd',
            },
            To: [{ Email: process.env['MJ_TO_ADDRESS'], Name: 'Magma Tech Services Nigeria Ltd' }],
            Bcc: [{ Email: process.env['MJ_BCC_ADDRESS'], Name: 'Admin' }],
            ReplyTo: { Email: email, Name: name },
            Subject: `New Enquiry — ${service}`,
            TextPart:
              `New enquiry received via magmatechng.com\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Company: ${company || 'Not provided'}\n` +
              `Service required: ${service}\n\n` +
              `Message:\n${message}`,
            HTMLPart: `
<div style="background-color:#f4f4f5; padding:32px 16px; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e4e4e7; border-top:3px solid #F7941D;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="background-color:#000000; padding:20px 24px;">
        <img src="https://www.magmatechng.com/logo.png" alt="Magma" height="28" style="display:block; height:28px; width:auto; border:0;" />
        <span style="color:#9ca3af; font-size:12px; display:block; margin-top:8px;">New website enquiry</span>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <p style="margin:0 0 16px 0; font-size:14px; color:#52525b;">
          A new enquiry was submitted via <strong>magmatechng.com</strong>.
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#18181b;">
          <tr>
            <td style="padding:8px 0; width:120px; color:#71717a;">Name</td>
            <td style="padding:8px 0;"><strong>${escapeHtml(name)}</strong></td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#71717a; border-top:1px solid #f0f0f1;">Email</td>
            <td style="padding:8px 0; border-top:1px solid #f0f0f1;">
              <a href="mailto:${escapeHtml(email)}" style="color:#F7941D; text-decoration:none;">${escapeHtml(email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#71717a; border-top:1px solid #f0f0f1;">Company</td>
            <td style="padding:8px 0; border-top:1px solid #f0f0f1;">${company ? escapeHtml(company) : 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#71717a; border-top:1px solid #f0f0f1;">Service</td>
            <td style="padding:8px 0; border-top:1px solid #f0f0f1;">
              <span style="background:#fff3e6; color:#c05e00; padding:2px 10px; border-radius:999px; font-size:12px; font-weight:bold;">${escapeHtml(service)}</span>
            </td>
          </tr>
        </table>

        <div style="margin-top:20px;">
          <p style="margin:0 0 6px 0; font-size:13px; color:#71717a; text-transform:uppercase; letter-spacing:0.04em;">Message</p>
          <div style="background:#f9fafb; border:1px solid #f0f0f1; border-radius:6px; padding:14px 16px; font-size:14px; color:#27272a; white-space:pre-wrap; line-height:1.5;">${escapeHtml(message)}</div>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px; background:#fafafa; border-top:1px solid #f0f0f1;">
        <p style="margin:0; font-size:12px; color:#a1a1aa;">
          Reply directly to this email to respond to ${escapeHtml(name)}.
        </p>
      </td>
    </tr>
  </table>
</div>
        `.trim(),
          },
        ],
      }),
    });

    if (!mailjetRes.ok) {
      const errBody = await mailjetRes.text();
      console.error('Mailjet error:', errBody);
      return res.status(502).json({ error: 'Failed to send enquiry' });
    }
  } catch (err) {
    console.error('Mailjet request error:', err);
    return res.status(502).json({ error: 'Failed to send enquiry' });
  }

  return res.status(200).json({ success: true });
}
