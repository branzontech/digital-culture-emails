
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

// Actualizamos la URL de API para que use el mismo dominio/puerto que el servidor backend
const API_URL = isProd 
  ? "/api/send-email"  // En producción, usamos una ruta relativa
  : "http://localhost:3000/api/send-email";  // URL para desarrollo local

export const sendEmail = async (options: EmailSendOptions): Promise<EmailResponse> => {
  try {
    console.log("Intentando enviar email con opciones:", {
      to: options.to,
      subject: options.subject,
      // No logueamos el contenido HTML completo por brevedad
      from: options.from,
    });
    
    // Verificar si el servidor está en ejecución antes de enviar
    try {
      // Intenta hacer una conexión con timeout reducido para verificar rápidamente
      const testConnection = API_URL.replace('/api/send-email', '');
      const testUrl = isProd ? window.location.origin + testConnection : testConnection;
      
      const testResponse = await fetch(testUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(2000), // 2 segundos de timeout
      });
      
      if (!testResponse.ok) {
        throw new Error('El servidor no respondió correctamente');
      }
    } catch (error) {
      console.error("Error de conexión al servidor:", error);
      return {
        success: false,
        message: "No se pudo conectar al servidor de correo. Asegúrate de que el servidor backend esté en ejecución ejecutando 'cd server && npm run dev' en una terminal separada. También verifica que hayas creado el archivo .env con la API key de Resend."
      };
    }
    
    // Continuar con el envío del correo si la conexión funciona
    try {
      // Determinar la URL completa en base al entorno
      const fullApiUrl = isProd ? window.location.origin + API_URL : API_URL;
      
      const response = await fetch(fullApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      
      // Primero verificar el tipo de contenido de la respuesta
      const contentType = response.headers.get("content-type");
      let data;
      
      // Verificar si la respuesta es JSON antes de intentar parsearla
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Si no es JSON, obtener el texto y manejarlo adecuadamente
        const textResponse = await response.text();
        console.log("Respuesta no JSON recibida:", textResponse);
        
        // Intentar crear un objeto manualmente
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
      // Si es un error de red, proporcionar un mensaje más claro
      if (error instanceof TypeError && error.message.includes("NetworkError")) {
        console.error("Error de conexión al servidor:", error);
        return {
          success: false,
          message: "No se pudo conectar al servidor de correo. Asegúrate de que el servidor backend esté en ejecución ejecutando 'cd server && npm run dev' en una terminal separada."
        };
      }
      
      // Otros errores
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
