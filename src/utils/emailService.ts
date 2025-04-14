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

import { isProd } from "@/lib/utils";

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
      // Not logging full HTML content for brevity
      from: options.from,
    });
    
    // Check if server is running before attempting to send
    const serverRunning = await isServerRunning();
    if (!serverRunning) {
      return {
        success: false,
        message: `No se pudo conectar al servidor de correo. Por favor:
          1. Asegúrate que el servidor backend esté ejecutándose (ejecuta 'cd server && npm run dev' en una terminal separada)
          2. Verifica que el archivo .env con la API key de Resend exista en la carpeta server
          3. Si estás en desarrollo local, verifica que estés usando http://localhost:8080 para acceder a la aplicación`
      };
    }
    
    // Send email if server is running
    try {
      // Build full API URL based on environment
      const fullApiUrl = isProd ? window.location.origin + API_URL : API_URL;
      
      const response = await fetch(fullApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": window.location.origin,
        },
        mode: 'cors',
        body: JSON.stringify(options),
      });
      
      // Handle response based on content type
      const contentType = response.headers.get("content-type");
      let data;
      
      // Parse response based on content type
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Handle non-JSON responses
        const textResponse = await response.text();
        console.log("Respuesta no JSON recibida:", textResponse);
        
        data = {
          message: response.ok 
            ? "Correo enviado exitosamente (respuesta no-JSON)" 
            : `Error: ${textResponse || "respuesta vacía"}`
        };
      }
      
      if (!response.ok) {
        throw new Error(data.message || "Error desconocido al enviar el correo");
      }
      
      return {
        success: true,
        message: data.message || "Correo enviado exitosamente",
        previewUrl: data.previewUrl
      };
    } catch (error) {
      // Handle specific network errors
      if (error instanceof TypeError && error.message.includes("NetworkError")) {
        console.error("Error de red al conectar con el servidor:", error);
        return {
          success: false,
          message: "Error de CORS o conexión rechazada. Verifica que el servidor permita conexiones desde tu origen actual y que esté configurado correctamente."
        };
      }
      
      // Other errors
      throw error;
    }
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
