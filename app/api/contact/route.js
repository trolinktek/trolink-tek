import nodemailer from 'nodemailer';

const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_TO'];
const MAX_FIELD_LENGTH = 5000;

function clean(value, max = MAX_FIELD_LENGTH) {
  return String(value ?? '').trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);
}

export async function POST(request) {
  const missing = REQUIRED_ENV.filter(key => !process.env[key]);
  if (missing.length) {
    console.error(`Missing SMTP environment variables: ${missing.join(', ')}`);
    return Response.json({ ok: false, message: 'Email service is not configured. Please contact us by email.' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: 'Invalid request body.' }, { status: 400 });
  }

  if (clean(body.website)) return Response.json({ ok: true });

  const name = clean(body.name, 200);
  const email = clean(body.email, 320);
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ ok: false, message: 'Please provide a valid name and work email.' }, { status: 400 });
  }

  const fields = Object.entries(body)
    .filter(([key, value]) => key !== 'website' && value !== '' && value != null)
    .map(([key, value]) => [clean(key, 100), clean(value)]);
  const text = fields.map(([key, value]) => `${key}: ${value}`).join('\n\n');
  const rows = fields.map(([key, value]) => `<tr><th style="padding:10px;text-align:left;vertical-align:top;border-bottom:1px solid #dce3ec">${escapeHtml(key)}</th><td style="padding:10px;border-bottom:1px solid #dce3ec;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('');
  const subjectDetail = clean(body.product || body.interest || body.model || 'General inquiry', 160);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE ?? 'true').toLowerCase() === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  });

  try {
    await transporter.sendMail({
      from: `TrolinkTek Website <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `[Website Inquiry] ${subjectDetail} - ${name}`,
      text,
      html: `<div style="font-family:Arial,sans-serif;color:#0a1830"><h2>New website inquiry</h2><table style="width:100%;border-collapse:collapse">${rows}</table></div>`
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error('SMTP send failed:', error?.code || error?.message || 'unknown error');
    return Response.json({ ok: false, message: 'Your inquiry could not be sent. Please try again or email sales03@trolinkiot.com.' }, { status: 502 });
  }
}

export function GET() {
  return Response.json({ ok: false, message: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
}
