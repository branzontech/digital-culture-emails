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

interface EmailResponse {
  success: boolean;
  message: string;
  previewUrl?: string;
}

import { supabase } from "@/integrations/supabase/client";

// API URL configuration
const API_URL = isProd 
  ? "/api/send-email"  // Production - relative URL
  : "http://localhost:3000/api/send-email";  // Development - explicit URL

// Helper function to check if server is running
const isServerRunning = async (): Promise<boolean> => {
  try {
    const testUrl = isProd ? window.location.origin : "http://localhost:3000";
    
    const response = await fetch(testUrl, {
      method: 'HEAD',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });
    
    return response.ok;
  } catch (error) {
    console.error("Server connection check failed:", error);
    return false;
  }
};

export const sendEmail = async (options: EmailSendOptions): Promise<EmailResponse> => {
  try {
    console.log("Intentando enviar email con opciones:", {
      to: options.to,
      subject: options.subject,
      from: options.from,
    });
    
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: options
    });

    if (error) {
      console.error("Error al enviar email:", error);
      return {
        success: false,
        message: `Error al enviar el email: ${error.message}`
      };
    }

    return {
      success: true,
      message: "Correo enviado exitosamente",
      previewUrl: data?.previewUrl
    };
  } catch (error) {
    console.error("Error al procesar el envío de email:", error);
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`
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
