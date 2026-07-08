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

  // 1. Verify Turnstile token
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

  // 2. Send via Mailjet
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
            From: { Email: 'classicpelmythe@gmail.com', Name: 'Magma Website' },
            To: [{ Email: 'oluwapelumi019a@gmail.com', Name: 'Magma' }],
            ReplyTo: { Email: email, Name: name },
            Subject: `New Enquiry — ${service}`,
            TextPart:
              `New enquiry received via magmatechng.com\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Company: ${company || 'Not provided'}\n` +
              `Service required: ${service}\n\n` +
              `Message:\n${message}`,
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
