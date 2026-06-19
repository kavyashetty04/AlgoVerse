// src/services/emailService.ts
import { API_BASE_URL } from '../config/api';

export const sendEmail = async (emailData: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  });
  return response.json();
};