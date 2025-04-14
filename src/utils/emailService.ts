
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

// Configuración para Office 365
const SMTP_USER = "soporteit@cuidadoseguro.com.co";
const SMTP_PASS = "N@078076206087ur";
const SMTP_HOST = "smtp.office365.com"; // Servidor SMTP de Office 365
const SMTP_PORT = 587; // Puerto recomendado para Office 365 con TLS

export const sendEmail = async (options: EmailSendOptions): Promise<{ success: boolean; message: string }> => {
  try {
    // En la aplicación actual, estamos simulando el envío de correo
    // En un entorno de producción real, esta función debería conectarse a un backend seguro
    // que maneje la conexión SMTP
    
    console.log("Intentando enviar email con opciones:", {
      ...options,
      // No mostrar credenciales sensibles en el log
      smtpConfig: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 587 ? false : true, // TLS para puerto 587
        auth: {
          user: SMTP_USER,
          // Password redacted for security
        }
      }
    });
    
    // IMPORTANTE: Esta es una aplicación de demostración
    // Actualmente no estamos enviando correos reales ya que eso requeriría:
    // 1. Un servidor backend seguro para manejar credenciales SMTP
    // 2. Configuración adecuada de CORS y seguridad
    // 3. Posiblemente una API de servicio de correo como SendGrid, Mailgun, etc.
    
    // Simular una demora de red para dar feedback visual al usuario
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recipients = Array.isArray(options.to) 
      ? options.to.map(r => r.email).join(", ") 
      : options.to.email;
    
    // Mensaje más claro sobre la simulación
    return {
      success: false, // Cambiado a false para ser honesto con el usuario
      message: `DEMOSTRACIÓN: El correo a ${recipients} no se ha enviado realmente. Esta es una simulación. Para implementar el envío real de correos, se requiere un backend seguro.`
    };
  } catch (error) {
    console.error("Error simulando envío de email:", error);
    return {
      success: false,
      message: `Error en la simulación de envío: ${error instanceof Error ? error.message : 'Error desconocido'}`
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
