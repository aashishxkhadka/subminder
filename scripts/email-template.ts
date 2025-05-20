interface EmailTemplateProps {
  email: string;
  subject: string;
  message: string;
}

export function generateEmailContent({ email, subject, message }: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .content {
      margin-bottom: 20px;
    }
    .footer {
      border-top: 2px solid #eee;
      padding-top: 10px;
      margin-top: 20px;
      font-size: 0.9em;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${subject}</h1>
  </div>
  <div class="content">
    ${message}
  </div>
  <div class="footer">
    <p>Best regards,<br> Subminder Team</p>
  </div>
</body>
</html>
  `;
} 