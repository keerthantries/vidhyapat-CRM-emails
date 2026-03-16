import nodemailer from 'nodemailer';

// ─────────────────────────────────────────
// BRAND CONFIG — edit here anytime
// ─────────────────────────────────────────
const BRAND = {
  name:    'Vidhyapat',
  website: 'https://vidhyapat.com',
  email:   'support@vidhyapat.com',
  phone:   '+91 98765 43210',
  logo:    'https://res.cloudinary.com/doqbjnliq/image/upload/v1768821884/logo_oe6pjv.png',
  colors: {
    primary:     '#1976d2',
    primaryDark: '#1565c0',
    success:     '#2e7d32',
    warning:     '#e65100',
    danger:      '#c62828',
    purple:      '#7c3aed',
    orange:      '#f97316',
    gray:        '#4b5563',
    lightBg:     '#f0f7ff',
    border:      '#dbeafe',
    text:        '#1a1a2e',
    muted:       '#6b7280'
  }
};

// ─────────────────────────────────────────
// BASE HTML WRAPPER
// ─────────────────────────────────────────
const wrap = (content, accentColor = BRAND.colors.primary) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%);
    margin: 0; padding: 0;
  }
  .email-outer { width: 100%; padding: 40px 16px; }
  .email-card {
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(25,118,210,0.12);
  }
  .email-header {
    background: ${accentColor};
    padding: 32px 40px 28px;
    text-align: center;
  }
  .email-header img {
    height: 52px;
    display: block;
    margin: 0 auto 16px;
    filter: brightness(0) invert(1);
  }
  .email-header h1 {
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.3px;
    margin: 0;
  }
  .email-header p {
    color: rgba(255,255,255,0.82);
    font-size: 13px;
    margin-top: 5px;
  }
  .email-body {
    padding: 36px 40px;
    color: ${BRAND.colors.text};
    font-size: 15px;
    line-height: 1.75;
  }
  .greeting { font-size: 16px; margin-bottom: 14px; }
  .info-table {
    width: 100%;
    border-collapse: collapse;
    margin: 22px 0;
    font-size: 14px;
    border-radius: 8px;
    overflow: hidden;
  }
  .info-table tr:nth-child(odd) td { background: ${BRAND.colors.lightBg}; }
  .info-table td {
    padding: 11px 16px;
    border: 1px solid ${BRAND.colors.border};
    color: ${BRAND.colors.text};
    vertical-align: middle;
  }
  .info-table td:first-child {
    font-weight: 600;
    width: 38%;
    color: ${accentColor};
  }
  .highlight-box {
    border-radius: 10px;
    padding: 22px 24px;
    margin: 22px 0;
  }
  .highlight-box h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .credential-box {
    background: #f0fdf4;
    border: 1.5px solid #bbf7d0;
    border-radius: 10px;
    padding: 22px 24px;
    margin: 22px 0;
  }
  .credential-box h3 {
    color: ${BRAND.colors.success};
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .cred-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 0;
    border-bottom: 1px solid #d1fae5;
    font-size: 14px;
  }
  .cred-row:last-child { border-bottom: none; }
  .cred-label {
    font-weight: 600;
    color: ${BRAND.colors.gray};
    min-width: 130px;
  }
  .cred-value {
    font-family: 'Courier New', monospace;
    background: #ecfdf5;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 13px;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }
  .cred-link {
    color: ${BRAND.colors.primary};
    font-weight: 600;
    text-decoration: none;
    font-size: 14px;
  }
  .alert-box {
    border-radius: 8px;
    padding: 13px 16px;
    margin: 14px 0;
    font-size: 13px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    line-height: 1.6;
  }
  .alert-box i { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .cta-btn {
    display: inline-block;
    padding: 13px 32px;
    border-radius: 30px;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    background: ${accentColor};
    box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  }
  .qr-wrap { text-align: center; margin: 18px 0; }
  .qr-wrap img {
    max-width: 170px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  }
  .qr-label {
    font-size: 12px;
    color: ${BRAND.colors.muted};
    margin-top: 8px;
  }
  .course-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 16px;
    margin: 8px 0;
    background: ${BRAND.colors.lightBg};
    border-left: 3px solid ${accentColor};
    border-radius: 0 8px 8px 0;
    font-size: 14px;
    color: ${BRAND.colors.text};
  }
  .course-pill i { color: ${accentColor}; font-size: 15px; }
  .divider { height: 1px; background: #e5e7eb; margin: 28px 0; }
  .signature { font-size: 14px; color: ${BRAND.colors.text}; }
  .signature strong { display: block; font-size: 16px; color: ${accentColor}; margin-top: 4px; }
  .email-footer {
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
    padding: 22px 40px;
    text-align: center;
    font-size: 12px;
    color: ${BRAND.colors.muted};
  }
  .email-footer a { color: ${accentColor}; text-decoration: none; }
  .footer-links {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .footer-links a { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; }
</style>
</head>
<body>
<div class="email-outer">
  <div class="email-card">
    <div class="email-header">
      <img src="${BRAND.logo}" alt="${BRAND.name}"/>
      <h1>${BRAND.name} Learning</h1>
      <p>Empowering Careers Through Technology</p>
    </div>
    <div class="email-body">${content}</div>
    <div class="email-footer">
      <p>&copy; 2025 ${BRAND.name} Learning. All rights reserved.</p>
      <div class="footer-links">
        <a href="${BRAND.website}"><i class="bi bi-globe"></i> vidhyapat.com</a>
        <a href="mailto:${BRAND.email}"><i class="bi bi-envelope"></i> ${BRAND.email}</a>
        <a href="tel:${BRAND.phone.replace(/\s/g,'')}"><i class="bi bi-telephone"></i> ${BRAND.phone}</a>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

// ─────────────────────────────────────────
// 1. NEW LEAD
// ─────────────────────────────────────────
function newLeadEmail({ name, course }) {
  return {
    subject: `Thank You for Reaching Out – ${BRAND.name}`,
    html: wrap(`
      <p class="greeting">Dear <strong>${name}</strong>,</p>
      <p>Thank you for contacting us! We have received your enquiry for <strong>${course}</strong> and we're delighted to hear from you.</p>

      <div class="highlight-box" style="background:#f0f7ff;border:1.5px solid #bfdbfe;">
        <h3 style="color:${BRAND.colors.primary};">
          <i class="bi bi-check-circle-fill" style="color:${BRAND.colors.primary}"></i>
          Enquiry Received Successfully
        </h3>
        <p style="font-size:14px;color:${BRAND.colors.gray};margin:0;line-height:1.7;">
          One of our course advisors will review your details and reach out to you shortly.
          We typically respond within <strong>1 business day</strong>.
        </p>
      </div>

      <table class="info-table">
        <tr>
          <td><i class="bi bi-mortarboard" style="margin-right:6px"></i>Course Interest</td>
          <td>${course}</td>
        </tr>
        <tr>
          <td><i class="bi bi-clock" style="margin-right:6px"></i>Response Time</td>
          <td>Within 1 business day</td>
        </tr>
        <tr>
          <td><i class="bi bi-headset" style="margin-right:6px"></i>Support</td>
          <td><a href="mailto:${BRAND.email}" style="color:${BRAND.colors.primary}">${BRAND.email}</a></td>
        </tr>
      </table>

      <p style="font-size:14px;color:${BRAND.colors.gray};">
        While you wait, feel free to explore our courses and resources on our website.
      </p>

      <div style="text-align:center;margin:28px 0;">
        <a href="${BRAND.website}" class="cta-btn">
          <i class="bi bi-grid" style="margin-right:6px"></i>Explore Our Programs
        </a>
      </div>

      <div class="divider"></div>
      <div class="signature">Warm regards,<strong>Team ${BRAND.name}</strong></div>
    `, BRAND.colors.primary)
  };
}

// ─────────────────────────────────────────
// 2. CONTACTED
// ─────────────────────────────────────────
function contactedEmail({ name, course }) {
  return {
    subject: `${BRAND.name} – Our Advisor Will Connect With You Soon`,
    html: wrap(`
      <p class="greeting">Dear <strong>${name}</strong>,</p>
      <p>Thank you for your interest in <strong>${course}</strong>. Our course advisor has noted your details and will be in touch with you very soon.</p>

      <div class="highlight-box" style="background:#f5f3ff;border:1.5px solid #ddd6fe;">
        <h3 style="color:${BRAND.colors.purple};">
          <i class="bi bi-telephone-outbound-fill" style="color:${BRAND.colors.purple}"></i>
          Expect a Call From Our Team
        </h3>
        <p style="font-size:14px;color:${BRAND.colors.gray};margin:0;line-height:1.7;">
          Our advisor will call or email you to walk you through the course,
          answer your questions, and help you choose the right learning plan.
        </p>
      </div>

      <table class="info-table">
        <tr>
          <td><i class="bi bi-mortarboard" style="margin-right:6px"></i>Course</td>
          <td>${course}</td>
        </tr>
        <tr>
          <td><i class="bi bi-person-badge" style="margin-right:6px"></i>Next Step</td>
          <td>Advisor call / email</td>
        </tr>
        <tr>
          <td><i class="bi bi-clock" style="margin-right:6px"></i>Timeline</td>
          <td>Within 1 business day</td>
        </tr>
      </table>

      <div style="text-align:center;margin:28px 0;">
        <a href="${BRAND.website}" class="cta-btn" style="background:${BRAND.colors.purple};">
          <i class="bi bi-laptop" style="margin-right:6px"></i>Browse Course Details
        </a>
      </div>

      <div class="divider"></div>
      <div class="signature">Warm regards,<strong>Team ${BRAND.name}</strong></div>
    `, BRAND.colors.purple)
  };
}

// ─────────────────────────────────────────
// 3. INTERESTED
// ─────────────────────────────────────────
function interestedEmail({ name, course, price, qrCodeUrl, curriculumLink }) {
  return {
    subject: `${BRAND.name} – Complete Your Enrollment for ${course}`,
    html: wrap(`
      <p class="greeting">Dear <strong>${name}</strong>,</p>
      <p>Great news — we're thrilled that you're interested in <strong>${course}</strong>! Here are all the details you need to secure your seat.</p>

      <table class="info-table">
        <tr>
          <td><i class="bi bi-mortarboard" style="margin-right:6px"></i>Course</td>
          <td><strong>${course}</strong></td>
        </tr>
        <tr>
          <td><i class="bi bi-currency-rupee" style="margin-right:6px"></i>Course Fee</td>
          <td><strong>${price || 'Contact us for pricing'}</strong></td>
        </tr>
        ${curriculumLink ? `
        <tr>
          <td><i class="bi bi-file-earmark-text" style="margin-right:6px"></i>Curriculum</td>
          <td><a href="${curriculumLink}" style="color:${BRAND.colors.primary};font-weight:600;">View Full Curriculum <i class="bi bi-box-arrow-up-right" style="font-size:11px"></i></a></td>
        </tr>` : ''}
      </table>

      <div class="highlight-box" style="background:#fff7ed;border:1.5px solid #fed7aa;">
        <h3 style="color:${BRAND.colors.warning};">
          <i class="bi bi-qr-code-scan" style="color:${BRAND.colors.warning}"></i>
          Complete Your Payment
        </h3>
        <p style="font-size:14px;color:${BRAND.colors.gray};margin-bottom:16px;line-height:1.7;">
          Scan the QR code below using any UPI app to complete your payment and confirm your seat.
        </p>
        ${qrCodeUrl
          ? `<div class="qr-wrap">
               <img src="${qrCodeUrl}" alt="Payment QR Code"/>
               <p class="qr-label"><i class="bi bi-phone" style="margin-right:4px"></i>Scan with any UPI app to pay</p>
             </div>`
          : `<p style="font-size:14px;color:${BRAND.colors.muted};text-align:center;padding:16px;background:#f9fafb;border-radius:8px;">
               <i class="bi bi-info-circle" style="margin-right:6px"></i>Payment QR will be shared by our team shortly.
             </p>`
        }
        <div class="alert-box" style="background:#fef3c7;border:1px solid #fde68a;">
          <i class="bi bi-exclamation-circle-fill" style="color:#92400e;"></i>
          <span style="color:#92400e;">After payment, please reply to this email with your <strong>transaction screenshot</strong> for quick verification.</span>
        </div>
      </div>

      <div class="alert-box" style="background:#f0f7ff;border:1px solid #bfdbfe;">
        <i class="bi bi-headset" style="color:${BRAND.colors.primary}"></i>
        <span style="color:${BRAND.colors.gray};">
          Need help? Contact us at <a href="mailto:${BRAND.email}" style="color:${BRAND.colors.primary};font-weight:600;">${BRAND.email}</a> or call <strong>${BRAND.phone}</strong>
        </span>
      </div>

      <div class="divider"></div>
      <div class="signature">Warm regards,<strong>Team ${BRAND.name}</strong></div>
    `, BRAND.colors.warning)
  };
}

// ─────────────────────────────────────────
// 4. PAYMENT PENDING
// ─────────────────────────────────────────
function paymentPendingEmail({ name, course, price, qrCodeUrl }) {
  return {
    subject: `${BRAND.name} – Your Payment for ${course} is Pending`,
    html: wrap(`
      <p class="greeting">Dear <strong>${name}</strong>,</p>
      <p>We noticed your payment for <strong>${course}</strong> is still pending. Your seat is reserved — complete the payment to lock in your spot!</p>

      <div class="highlight-box" style="background:#fff7ed;border:1.5px solid #fed7aa;">
        <h3 style="color:${BRAND.colors.orange};">
          <i class="bi bi-hourglass-split" style="color:${BRAND.colors.orange}"></i>
          Payment Pending
        </h3>
        <table class="info-table" style="margin-bottom:16px;">
          <tr>
            <td><i class="bi bi-mortarboard" style="margin-right:6px"></i>Course</td>
            <td><strong>${course}</strong></td>
          </tr>
          <tr>
            <td><i class="bi bi-currency-rupee" style="margin-right:6px"></i>Amount</td>
            <td><strong>${price || 'Contact us for details'}</strong></td>
          </tr>
        </table>
        ${qrCodeUrl
          ? `<div class="qr-wrap">
               <img src="${qrCodeUrl}" alt="Payment QR Code"/>
               <p class="qr-label"><i class="bi bi-phone" style="margin-right:4px"></i>Scan to pay instantly</p>
             </div>`
          : `<p style="font-size:14px;color:${BRAND.colors.muted};text-align:center;padding:16px;background:#f9fafb;border-radius:8px;">
               <i class="bi bi-info-circle" style="margin-right:6px"></i>Contact us for payment details.
             </p>`
        }
      </div>

      <div class="alert-box" style="background:#f0fdf4;border:1px solid #bbf7d0;">
        <i class="bi bi-check-circle-fill" style="color:${BRAND.colors.success}"></i>
        <span style="color:#065f46;">
          Once payment is done, reply with your <strong>transaction screenshot</strong> and we'll activate your account within <strong>24 hours</strong>.
        </span>
      </div>

      <div class="alert-box" style="background:#f0f7ff;border:1px solid #bfdbfe;">
        <i class="bi bi-headset" style="color:${BRAND.colors.primary}"></i>
        <span style="color:${BRAND.colors.gray};">
          Questions? Reach us at <a href="mailto:${BRAND.email}" style="color:${BRAND.colors.primary};font-weight:600;">${BRAND.email}</a>
        </span>
      </div>

      <div class="divider"></div>
      <div class="signature">Warm regards,<strong>Team ${BRAND.name}</strong></div>
    `, BRAND.colors.orange)
  };
}

// ─────────────────────────────────────────
// 5. ENROLLED
// ─────────────────────────────────────────
function enrolledEmail({ name, course, lmsUrl, username, tempPassword, startDate }) {
  return {
    subject: `Welcome to ${BRAND.name} – Your LMS Access for ${course} is Ready`,
    html: wrap(`
      <p class="greeting">Dear <strong>${name}</strong>,</p>
      <p>Congratulations! Your enrollment for <strong>${course}</strong> is confirmed. We're excited to have you on board — your learning portal is ready and waiting.</p>

      <div class="credential-box">
        <h3>
          <i class="bi bi-shield-lock-fill"></i>
          Your Login Credentials
        </h3>
        <div class="cred-row">
          <span class="cred-label"><i class="bi bi-link-45deg" style="margin-right:4px"></i>LMS Portal</span>
          <a href="${lmsUrl || 'https://lms.vidhyapat.com'}" class="cred-link">
            ${lmsUrl || 'https://lms.vidhyapat.com'} <i class="bi bi-box-arrow-up-right" style="font-size:11px;margin-left:3px"></i>
          </a>
        </div>
        <div class="cred-row">
          <span class="cred-label"><i class="bi bi-person" style="margin-right:4px"></i>Username</span>
          <span class="cred-value">${username}</span>
        </div>
        <div class="cred-row">
          <span class="cred-label"><i class="bi bi-key" style="margin-right:4px"></i>Password</span>
          <span class="cred-value">${tempPassword || 'Vidhyapat@123'}</span>
        </div>
        ${startDate ? `
        <div class="cred-row">
          <span class="cred-label"><i class="bi bi-calendar-event" style="margin-right:4px"></i>Course Starts</span>
          <span style="font-size:14px;color:${BRAND.colors.text};">${startDate}</span>
        </div>` : ''}
      </div>

      <div class="alert-box" style="background:#fffbeb;border:1px solid #fde68a;">
        <i class="bi bi-exclamation-triangle-fill" style="color:#92400e;"></i>
        <span style="color:#92400e;"><strong>Important:</strong> Please change your password after first login to keep your account secure.</span>
      </div>

      <div style="text-align:center;margin:28px 0;">
        <a href="${lmsUrl || 'https://lms.vidhyapat.com'}" class="cta-btn" style="background:${BRAND.colors.success};">
          <i class="bi bi-play-circle" style="margin-right:6px"></i>Start Learning Now
        </a>
      </div>

      <div class="alert-box" style="background:#f0f7ff;border:1px solid #bfdbfe;">
        <i class="bi bi-headset" style="color:${BRAND.colors.primary}"></i>
        <span style="color:${BRAND.colors.gray};">
          Need help getting started? We're here at <a href="mailto:${BRAND.email}" style="color:${BRAND.colors.primary};font-weight:600;">${BRAND.email}</a>
        </span>
      </div>

      <div class="divider"></div>
      <p style="font-size:14px;color:${BRAND.colors.gray};">Welcome aboard! We're thrilled to be part of your learning journey.</p>
      <div class="signature" style="margin-top:16px;">Warm regards,<strong>Team ${BRAND.name}</strong></div>
    `, BRAND.colors.success)
  };
}

// ─────────────────────────────────────────
// 6. NOT INTERESTED
// ─────────────────────────────────────────
function notInterestedEmail({ name }) {
  return {
    subject: `Thank You for Your Interest in ${BRAND.name}`,
    html: wrap(`
      <p class="greeting">Dear <strong>${name}</strong>,</p>
      <p>Thank you for taking the time to explore ${BRAND.name}. We completely understand that the timing may not be right — and that's perfectly okay.</p>

      <p style="margin-top:16px;font-size:14px;color:${BRAND.colors.gray};">
        Whenever you're ready to take the next step in your career, we're here with industry-ready programs in:
      </p>

      <div style="margin:18px 0;">
        <div class="course-pill"><i class="bi bi-robot"></i> AI / Machine Learning</div>
        <div class="course-pill"><i class="bi bi-shield-check"></i> Cyber Security</div>
        <div class="course-pill"><i class="bi bi-code-slash"></i> Full Stack Development</div>
        <div class="course-pill"><i class="bi bi-phone"></i> Android &amp; iOS Development</div>
        <div class="course-pill"><i class="bi bi-bug"></i> Software Testing</div>
      </div>

      <div style="text-align:center;margin:28px 0;">
        <a href="${BRAND.website}" class="cta-btn" style="background:${BRAND.colors.gray};">
          <i class="bi bi-grid" style="margin-right:6px"></i>Explore All Programs
        </a>
      </div>

      <p style="font-size:13px;color:${BRAND.colors.muted};text-align:center;">
        We look forward to supporting your learning journey someday.
      </p>

      <div class="divider"></div>
      <div class="signature">Warm regards,<strong>Team ${BRAND.name}</strong></div>
    `, BRAND.colors.gray)
  };
}

// ─────────────────────────────────────────
// 7. CLOSED
// ─────────────────────────────────────────
function closedEmail({ name }) {
  return {
    subject: `${BRAND.name} – We Hope to Connect Again`,
    html: wrap(`
      <p class="greeting">Dear <strong>${name}</strong>,</p>
      <p>We're closing your enquiry for now, but we wanted to thank you sincerely for considering ${BRAND.name} as your learning partner.</p>

      <div class="highlight-box" style="background:#f9fafb;border:1.5px solid #e5e7eb;text-align:center;">
        <i class="bi bi-stars" style="font-size:38px;color:${BRAND.colors.primary};display:block;margin-bottom:14px;"></i>
        <p style="font-size:15px;color:${BRAND.colors.gray};line-height:1.75;margin:0;">
          If you ever decide to upskill in <strong>AI/ML, Cyber Security, Full Stack Development</strong>
          or any of our other programs — we'll be right here, ready to help you grow.
        </p>
      </div>

      <div style="text-align:center;margin:28px 0;">
        <a href="${BRAND.website}" class="cta-btn">
          <i class="bi bi-arrow-return-right" style="margin-right:6px"></i>Visit ${BRAND.name}
        </a>
      </div>

      <div class="divider"></div>
      <div class="signature">Warm regards,<strong>Team ${BRAND.name}</strong></div>
    `, BRAND.colors.primary)
  };
}

// ─────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  const {
    status, studentEmail, studentName, course,
    price, qrCodeUrl, curriculumLink,
    lmsUrl, username, tempPassword, startDate
  } = req.body || {};

  if (!status || !studentEmail || !studentName) {
    return res.status(400).json({ error: 'Missing required fields: status, studentEmail, studentName' });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({ error: 'Email configuration error on server' });
  }

  let emailContent;
  switch (status) {
    case 'New Lead':
      emailContent = newLeadEmail({ name: studentName, course });
      break;
    case 'Contacted':
      emailContent = contactedEmail({ name: studentName, course });
      break;
    case 'Interested':
      emailContent = interestedEmail({ name: studentName, course, price, qrCodeUrl, curriculumLink });
      break;
    case 'Payment Pending':
      emailContent = paymentPendingEmail({ name: studentName, course, price, qrCodeUrl });
      break;
    case 'Enrolled':
      emailContent = enrolledEmail({
        name: studentName, course, lmsUrl,
        username: username || studentEmail,
        tempPassword, startDate
      });
      break;
    case 'Not Interested':
      emailContent = notInterestedEmail({ name: studentName });
      break;
    case 'Closed':
      emailContent = closedEmail({ name: studentName });
      break;
    default:
      return res.status(200).json({ ok: true, skipped: true, reason: `No template for status: ${status}` });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from:    `"${BRAND.name} Learning" <${process.env.SMTP_USER}>`,
      to:      studentEmail,
      subject: emailContent.subject,
      html:    emailContent.html
    });

    console.log(`[email] ✅ ${status} → ${studentEmail}`);
    return res.status(200).json({ ok: true, message: `Email sent for status: ${status}` });

  } catch (err) {
    console.error('[email] SMTP error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}