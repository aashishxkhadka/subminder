import * as React from 'react';

interface EmailTemplateProps {
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  subject,
  message,
}) => (
  <div>
    <h1>{subject}</h1>
    <p>Dear {email},</p>
    <div>{message}</div>
    <p>Best regards,<br />Subminder Team</p>
  </div>
);