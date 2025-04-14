
// IMPORTANT: In a production environment, SMTP credentials should be stored
// securely on the backend, not in the frontend. This implementation is for 
// demonstration purposes only.

interface EmailRecipient {
  email: string;
  name?: string;
}

interface EmailSendOptions {
  to: EmailRecipient | EmailRecipient[];
  subject: string;
  htmlContent: string;
  from?: EmailRecipient;
}

// These should be environment variables or stored securely
const SMTP_USER = "soporteit@cuidadoseguro.com.co";
const SMTP_PASS = "N@078076206087ur";
const SMTP_HOST = "smtp.gmail.com"; // Adjust this based on your email provider
const SMTP_PORT = 587; // Adjust this based on your email provider

export const sendEmail = async (options: EmailSendOptions): Promise<{ success: boolean; message: string }> => {
  try {
    // In a real implementation, this would make a secure API call to a backend service
    // that handles the SMTP connection. Never expose SMTP credentials in frontend code.
    
    console.log("Sending email with options:", {
      ...options,
      // Don't log sensitive credentials
      smtpConfig: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465, // Fix: Compare with number, not number literal type
        auth: {
          user: SMTP_USER,
          // Password redacted for security
        }
      }
    });
    
    // For demonstration purposes, we're simulating a successful email send
    // In production, this would be a real API call
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recipients = Array.isArray(options.to) 
      ? options.to.map(r => r.email).join(", ") 
      : options.to.email;
    
    return {
      success: true,
      message: `Email enviado exitosamente a ${recipients}`
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: `Error al enviar el correo: ${error instanceof Error ? error.message : 'Error desconocido'}`
    };
  }
};

export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const parseEmailList = (emailsString: string): EmailRecipient[] => {
  // Split by commas, semicolons or newlines
  const emails = emailsString.split(/[,;\n]+/).map(email => email.trim()).filter(Boolean);
  
  // Convert to recipient objects and filter invalid ones
  return emails
    .filter(validateEmail)
    .map(email => ({ email }));
};
