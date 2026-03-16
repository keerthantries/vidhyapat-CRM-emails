# Vidhyapat Email API

Status-triggered automated email service for Vidhyapat CRM.

## Emails sent per status

| Status          | Email Sent                          |
|-----------------|-------------------------------------|
| New Lead        | ❌ No email                         |
| Contacted       | ✅ "We'll be in touch" email        |
| Interested      | ✅ Course details + QR code         |
| Payment Pending | ✅ Payment reminder + QR code       |
| Enrolled        | ✅ LMS login credentials            |
| Not Interested  | ✅ Thank you + explore programs     |
| Closed          | ✅ We hope to see you again         |

## Environment Variables (set in Vercel)

| Key       | Value                        |
|-----------|------------------------------|
| SMTP_USER | your Gmail address           |
| SMTP_PASS | your Gmail app password      |

## API Endpoint

`POST /api/send-status-email`

### Request Body

```json
{
  "status": "Interested",
  "studentEmail": "student@example.com",
  "studentName": "Ravi Kumar",
  "course": "Full Stack Development",
  "price": "₹8999 onwards",
  "qrCodeUrl": "https://example.com/qr.png",
  "curriculumLink": "https://vidhyapat.com/#courses",
  "lmsUrl": "https://lms.vidhyapat.com",
  "username": "student@example.com",
  "tempPassword": "Vidhyapat@123",
  "startDate": "1 April 2025"
}
```

### Response

```json
{ "ok": true, "message": "Email sent to student@example.com for status: Interested" }
```