
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

import { isProd } from "@/lib/utils";

// La URL donde estará el endpoint de nuestro backend
const API_URL = isProd 
  ? "https://tu-dominio-backend.com/api/send-email"  // Cambia esto por tu URL de producción
  : "http://localhost:3000/api/send-email";         // URL para desarrollo local

export const sendEmail = async (options: EmailSendOptions): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("Intentando enviar email con opciones:", {
      to: options.to,
      subject: options.subject,
      // No logueamos el contenido HTML completo por brevedad
      from: options.from,
    });
    
    // En modo desarrollo, simulamos el envío para facilitar pruebas
    if (!isProd) {
      // Simular una demora de red para dar feedback visual al usuario
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const recipients = Array.isArray(options.to) 
        ? options.to.map(r => r.email).join(", ") 
        : options.to.email;
      
      console.log("Simulando envío de correo en modo desarrollo");
      
      // Mostrar mensaje informativo en desarrollo
      return {
        success: true,
        message: `DESARROLLO: Simulación de envío a ${recipients}. En producción, se enviará realmente a través del backend.`
      };
    }
    
    // En producción, enviar a través del backend
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Error desconocido al enviar el correo");
    }
    
    return {
      success: true,
      message: data.message || "Correo enviado exitosamente"
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
