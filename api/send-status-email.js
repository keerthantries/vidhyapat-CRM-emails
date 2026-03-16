import nodemailer from 'nodemailer';

// ─────────────────────────────────────────
// EMAIL TEMPLATES
// ─────────────────────────────────────────

// Shared header/footer for all emails
const emailWrapper = (content, accentColor = '#1d4ed8') => `
<div style="width:100%;background:#f5f5f5;padding:20px 0;margin:0;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background:${accentColor};padding:28px 32px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;letter-spacing:0.5px;">🎓 Vidhyapat Learning</h1>
      <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px;">Empowering Careers Through Technology</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      ${content}
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        © 2025 Vidhyapat Learning. All rights reserved.<br>
        <a href="https://vidhyapat.com" style="color:${accentColor};text-decoration:none;">vidhyapat.com</a>
        &nbsp;|&nbsp;
        <a href="mailto:support@vidhyapat.com" style="color:${accentColor};text-decoration:none;">support@vidhyapat.com</a>
      </p>
    </div>

  </div>
</div>`;

// ── 1. INTERESTED ──────────────────────────────────────────
function interestedEmail({ name, course, price, qrCodeUrl, curriculumLink }) {
  return {
    subject: `Vidhyapat – Course Enrollment Details for ${course}`,
    html: emailWrapper(`
      <p style="font-size:16px;color:#111827;margin-top:0;">Dear <strong>${name}</strong>,</p>
      <p style="color:#374151;line-height:1.7;">
        Thank you for your interest in <strong>${course}</strong> at Vidhyapat! 🎉<br>
        We're excited to have you take this next step. Here are your course details:
      </p>

      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px;">
        <tr style="background:#eff6ff;">
          <td style="padding:12px 16px;border:1px solid #dbeafe;font-weight:600;color:#1e40af;width:38%;">Course</td>
          <td style="padding:12px 16px;border:1px solid #dbeafe;color:#1f2937;">${course}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;border:1px solid #e5e7eb;font-weight:600;color:#374151;">Course Fee</td>
          <td style="padding:12px 16px;border:1px solid #e5e7eb;color:#1f2937;">${price || 'Contact us for pricing'}</td>
        </tr>
        ${curriculumLink ? `
        <tr style="background:#eff6ff;">
          <td style="padding:12px 16px;border:1px solid #dbeafe;font-weight:600;color:#1e40af;">Curriculum</td>
          <td style="padding:12px 16px;border:1px solid #dbeafe;">
            <a href="${curriculumLink}" style="color:#1d4ed8;font-weight:600;">View Full Curriculum →</a>
          </td>
        </tr>` : ''}
      </table>

      <!-- Payment Section -->
      <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:22px;margin:24px 0;">
        <h3 style="margin:0 0 12px;color:#c2410c;font-size:15px;">💳 Complete Your Payment</h3>
        <p style="margin:0 0 10px;font-size:14px;color:#374151;line-height:1.6;">
          Scan the QR code below to pay and confirm your seat:
        </p>
        ${qrCodeUrl
          ? `<div style="text-align:center;margin:16px 0;">
               <img src="${qrCodeUrl}" alt="Payment QR Code"
                    style="max-width:180px;border:2px solid #e5e7eb;border-radius:10px;padding:10px;background:#fff;">
               <p style="font-size:12px;color:#6b7280;margin:8px 0 0;">Scan to pay</p>
             </div>`
          : `<p style="font-size:14px;color:#6b7280;">QR code will be shared by our team shortly.</p>`
        }
        <p style="font-size:13px;color:#374151;margin:12px 0 0;background:#fef3c7;padding:10px 14px;border-radius:6px;">
          📸 After payment, please reply to this email with your <strong>transaction screenshot</strong> for quick verification.
        </p>
      </div>

      <p style="font-size:14px;color:#374151;line-height:1.7;">
        Questions? Our team is here to help.<br>
        📧 <a href="mailto:support@vidhyapat.com" style="color:#1d4ed8;">support@vidhyapat.com</a>
      </p>

      <p style="margin-top:28px;font-size:14px;color:#374151;">
        Warm regards,<br>
        <strong style="color:#111827;font-size:15px;">Team Vidhyapat</strong>
      </p>
    `, '#1d4ed8')
  };
}

// ── 2. PAYMENT PENDING ─────────────────────────────────────
function paymentPendingEmail({ name, course, price, qrCodeUrl }) {
  return {
    subject: `Vidhyapat – Payment Pending for ${course}`,
    html: emailWrapper(`
      <p style="font-size:16px;color:#111827;margin-top:0;">Dear <strong>${name}</strong>,</p>
      <p style="color:#374151;line-height:1.7;">
        We noticed your payment for <strong>${course}</strong> is still pending. 
        Your seat is reserved — complete the payment to confirm your enrollment!
      </p>

      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:22px;margin:24px 0;text-align:center;">
        <h3 style="margin:0 0 8px;color:#92400e;font-size:15px;">⏳ Payment Pending</h3>
        <p style="font-size:14px;color:#374151;margin:0 0 6px;">Course: <strong>${course}</strong></p>
        <p style="font-size:14px;color:#374151;margin:0 0 16px;">Amount: <strong>${price || 'Contact us'}</strong></p>
        ${qrCodeUrl
          ? `<img src="${qrCodeUrl}" alt="Payment QR"
                  style="max-width:170px;border:2px solid #e5e7eb;border-radius:10px;padding:10px;background:#fff;">
             <p style="font-size:12px;color:#6b7280;margin:8px 0 0;">Scan to pay</p>`
          : `<p style="font-size:14px;color:#6b7280;">Contact us for payment details.</p>`
        }
      </div>

      <p style="font-size:13px;color:#374151;background:#ecfdf5;padding:12px 16px;border-radius:6px;border:1px solid #bbf7d0;">
        ✅ Once payment is done, reply with your <strong>transaction screenshot</strong> and we'll activate your account within 24 hours.
      </p>

      <p style="margin-top:28px;font-size:14px;color:#374151;">
        Warm regards,<br>
        <strong style="color:#111827;">Team Vidhyapat</strong>
      </p>
    `, '#f59e0b')
  };
}

// ── 3. ENROLLED ────────────────────────────────────────────
function enrolledEmail({ name, course, lmsUrl, username, tempPassword, startDate }) {
  return {
    subject: `🎉 Welcome to Vidhyapat – Your LMS Access for ${course}`,
    html: emailWrapper(`
      <p style="font-size:16px;color:#111827;margin-top:0;">Dear <strong>${name}</strong>,</p>
      <p style="color:#374151;line-height:1.7;">
        🎊 <strong>Congratulations! Your enrollment for ${course} is confirmed.</strong><br>
        You can now access the Vidhyapat Learning Portal using the credentials below.
      </p>

      <div style="background:#ecfdf5;border:2px solid #6ee7b7;border-radius:10px;padding:24px;margin:20px 0;">
        <h3 style="margin:0 0 16px;color:#065f46;font-size:15px;">🔐 Your Login Credentials</h3>
        <table style="width:100%;font-size:14px;">
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#374151;width:40%;">LMS Portal</td>
            <td style="padding:8px 0;">
              <a href="${lmsUrl || 'https://lms.vidhyapat.com'}" style="color:#1d4ed8;font-weight:600;">
                ${lmsUrl || 'https://lms.vidhyapat.com'} →
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#374151;">Username</td>
            <td style="padding:8px 0;">
              <span style="font-family:monospace;background:#f3f4f6;padding:4px 10px;border-radius:4px;font-size:13px;">
                ${username}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#374151;">Password</td>
            <td style="padding:8px 0;">
              <span style="font-family:monospace;background:#f3f4f6;padding:4px 10px;border-radius:4px;font-size:13px;">
                ${tempPassword || 'Vidhyapat@123'}
              </span>
            </td>
          </tr>
          ${startDate ? `
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#374151;">Course Starts</td>
            <td style="padding:8px 0;color:#374151;">${startDate}</td>
          </tr>` : ''}
        </table>
      </div>

      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;margin:16px 0;">
        <p style="margin:0;font-size:13px;color:#92400e;">
          ⚠️ <strong>Please change your password</strong> after your first login for security.
        </p>
      </div>

      <p style="font-size:15px;color:#374151;line-height:1.7;margin-top:20px;">
        Welcome aboard! We're thrilled to be part of your learning journey. 🚀<br><br>
        Need help? <a href="mailto:support@vidhyapat.com" style="color:#1d4ed8;">support@vidhyapat.com</a>
      </p>

      <p style="margin-top:28px;font-size:14px;color:#374151;">
        Warm regards,<br>
        <strong style="color:#111827;">Team Vidhyapat</strong>
      </p>
    `, '#059669')
  };
}

// ── 4. NOT INTERESTED ──────────────────────────────────────
function notInterestedEmail({ name }) {
  return {
    subject: `Thank You for Your Interest in Vidhyapat`,
    html: emailWrapper(`
      <p style="font-size:16px;color:#111827;margin-top:0;">Dear <strong>${name}</strong>,</p>
      <p style="color:#374151;line-height:1.7;">
        Thank you for taking the time to explore Vidhyapat. We completely understand 
        that the timing may not be right for you at the moment — and that's perfectly okay!
      </p>
      <p style="color:#374151;line-height:1.7;">
        Whenever you're ready to take your career to the next level, we're here with courses in:
      </p>

      <div style="margin:20px 0;">
        ${['🤖 AI / Machine Learning', '🔐 Cyber Security', '💻 Full Stack Development',
           '📱 Android & iOS Development', '🧪 Software Testing'].map(item => `
          <div style="padding:10px 16px;margin:8px 0;background:#f9fafb;border-left:3px solid #1d4ed8;border-radius:0 6px 6px 0;font-size:14px;color:#374151;">
            ${item}
          </div>`).join('')}
      </div>

      <div style="text-align:center;margin:30px 0;">
        <a href="https://vidhyapat.com"
           style="background:#1d4ed8;color:#fff;padding:13px 30px;border-radius:30px;
                  text-decoration:none;font-size:15px;font-weight:600;display:inline-block;">
          Explore Our Programs →
        </a>
      </div>

      <p style="font-size:14px;color:#6b7280;text-align:center;">
        We look forward to supporting your learning journey someday. 😊
      </p>

      <p style="margin-top:28px;font-size:14px;color:#374151;">
        Warm regards,<br>
        <strong style="color:#111827;">Team Vidhyapat</strong>
      </p>
    `, '#4b5563')
  };
}

// ── 5. CONTACTED ───────────────────────────────────────────
function contactedEmail({ name, course }) {
  return {
    subject: `Vidhyapat – We'll Be in Touch Soon!`,
    html: emailWrapper(`
      <p style="font-size:16px;color:#111827;margin-top:0;">Dear <strong>${name}</strong>,</p>
      <p style="color:#374151;line-height:1.7;">
        Thank you for your interest in <strong>${course}</strong> at Vidhyapat! 
        One of our course advisors will be reaching out to you shortly.
      </p>

      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:20px;margin:24px 0;text-align:center;">
        <p style="font-size:28px;margin:0 0 8px;">📞</p>
        <p style="font-size:15px;color:#1e40af;font-weight:600;margin:0;">Expect a call from our team soon!</p>
        <p style="font-size:13px;color:#374151;margin:8px 0 0;">We typically reach out within <strong>1 business day</strong>.</p>
      </div>

      <p style="color:#374151;line-height:1.7;font-size:14px;">
        In the meantime, feel free to explore our courses at 
        <a href="https://vidhyapat.com" style="color:#1d4ed8;">vidhyapat.com</a>
      </p>

      <p style="margin-top:28px;font-size:14px;color:#374151;">
        Warm regards,<br>
        <strong style="color:#111827;">Team Vidhyapat</strong>
      </p>
    `, '#8b5cf6')
  };
}

// ── 6. CLOSED ──────────────────────────────────────────────
function closedEmail({ name }) {
  return {
    subject: `Vidhyapat – We Hope to See You Again`,
    html: emailWrapper(`
      <p style="font-size:16px;color:#111827;margin-top:0;">Dear <strong>${name}</strong>,</p>
      <p style="color:#374151;line-height:1.7;">
        We wanted to reach out and thank you for considering Vidhyapat. 
        We're closing this inquiry for now, but our doors are always open!
      </p>

      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px;margin:24px 0;text-align:center;">
        <p style="font-size:28px;margin:0 0 8px;">🌟</p>
        <p style="font-size:14px;color:#374151;margin:0;line-height:1.7;">
          If you ever decide to upskill in <strong>AI/ML, Cyber Security, Full Stack Development</strong> 
          or any of our other programs — we'll be right here for you.
        </p>
      </div>

      <div style="text-align:center;margin:28px 0;">
        <a href="https://vidhyapat.com"
           style="background:#4b5563;color:#fff;padding:13px 30px;border-radius:30px;
                  text-decoration:none;font-size:15px;font-weight:600;display:inline-block;">
          Visit Vidhyapat →
        </a>
      </div>

      <p style="margin-top:28px;font-size:14px;color:#374151;">
        Warm regards,<br>
        <strong style="color:#111827;">Team Vidhyapat</strong>
      </p>
    `, '#6b7280')
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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    status,
    studentEmail,
    studentName,
    course,
    // Interested / Payment Pending
    price,
    qrCodeUrl,
    curriculumLink,
    // Enrolled
    lmsUrl,
    username,
    tempPassword,
    startDate
  } = req.body || {};

  // Validate required fields
  if (!status || !studentEmail || !studentName) {
    return res.status(400).json({ error: 'Missing required fields: status, studentEmail, studentName' });
  }

  // Check env vars
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Missing SMTP credentials');
    return res.status(500).json({ error: 'Email configuration error on server' });
  }

  // Pick template based on status
  let emailContent;
  switch (status) {
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
        name: studentName, course,
        lmsUrl,
        username: username || studentEmail,
        tempPassword,
        startDate
      });
      break;
    case 'Not Interested':
      emailContent = notInterestedEmail({ name: studentName });
      break;
    case 'Closed':
      emailContent = closedEmail({ name: studentName });
      break;
    default:
      // New Lead — no email needed
      return res.status(200).json({ ok: true, skipped: true, reason: `No email template for status: ${status}` });
  }

  // Send email
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Vidhyapat Learning" <${process.env.SMTP_USER}>`,
      to: studentEmail,
      subject: emailContent.subject,
      html: emailContent.html
    });

    console.log(`[send-status-email] ✅ Sent ${status} email to ${studentEmail}`);
    return res.status(200).json({ ok: true, message: `Email sent to ${studentEmail} for status: ${status}` });

  } catch (err) {
    console.error('[send-status-email] SMTP error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}