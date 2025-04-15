
import { supabase } from "@/integrations/supabase/client";
import React from "react";
import ReactDOMServer from "react-dom/server";
import TemplateOne from "@/components/email-templates/TemplateOne";
import TemplateTwo from "@/components/email-templates/TemplateTwo";
import TemplateThree from "@/components/email-templates/TemplateThree";
import TemplateFour from "@/components/email-templates/TemplateFour";
import TemplateFive from "@/components/email-templates/TemplateFive";
import TemplateSix from "@/components/email-templates/TemplateSix";
import TemplateSeven from "@/components/email-templates/TemplateSeven";
import TemplateEight from "@/components/email-templates/TemplateEight";
import TemplateNine from "@/components/email-templates/TemplateNine";

interface EmailRecipient {
  email: string;
  name?: string;
}

interface EmailSendOptions {
  to: EmailRecipient | EmailRecipient[];
  subject: string;
  htmlContent: string;
  from?: EmailRecipient;
  templateId?: string;
  templateProps?: {
    subject: string;
    heading: string;
    subheading: string;
    content: string;
    buttonText: string;
    buttonUrl: string;
    imageUrl: string;
  };
}

interface EmailResponse {
  success: boolean;
  message: string;
  previewUrl?: string;
}

// Cache para las imágenes convertidas a base64 para mejorar el rendimiento
const imageCache = new Map<string, string>();

// Función mejorada para convertir una imagen a base64 con mejor manejo de tipos MIME y errores
const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    // Si la URL ya está en formato base64, devolverla directamente
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    // Verificar si la imagen ya está en caché
    if (imageCache.has(imageUrl)) {
      console.log('Usando imagen en caché:', imageUrl);
      return imageCache.get(imageUrl)!;
    }

    // Intentar obtener la imagen usando fetch
    console.log('Convirtiendo imagen a base64:', imageUrl);
    const response = await fetch(imageUrl, { 
      // Incluimos headers para evitar problemas de CORS
      headers: {
        'Accept': 'image/*',
      },
      mode: 'cors',
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      throw new Error(`No se pudo cargar la imagen (status ${response.status}): ${imageUrl}`);
    }
    
    // Obtener el tipo de contenido
    let contentType = response.headers.get('content-type');
    if (!contentType) {
      // Intentar determinar el tipo de contenido por la extensión del archivo
      if (imageUrl.match(/\.(jpeg|jpg)$/i)) contentType = 'image/jpeg';
      else if (imageUrl.match(/\.(png)$/i)) contentType = 'image/png';
      else if (imageUrl.match(/\.(gif)$/i)) contentType = 'image/gif';
      else if (imageUrl.match(/\.(svg)$/i)) contentType = 'image/svg+xml';
      else if (imageUrl.match(/\.(webp)$/i)) contentType = 'image/webp';
      else contentType = 'image/png'; // Tipo por defecto
    }
    
    // Obtener los datos binarios
    const arrayBuffer = await response.arrayBuffer();
    
    // Convertir a base64
    const base64 = btoa(
      new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    // Crear y almacenar en caché la URL de datos
    const dataUrl = `data:${contentType};base64,${base64}`;
    imageCache.set(imageUrl, dataUrl);
    
    return dataUrl;
  } catch (error) {
    console.error('Error al convertir imagen a base64:', error);
    
    // Plan B: Intentar con una API pública de conversión si está disponible
    try {
      console.log('Intentando método alternativo para la imagen:', imageUrl);
      // Este es un ejemplo, deberías implementar tu propia lógica alternativa
      // o usar un servicio de proxy de imágenes si es posible
      
      // Por ahora, devolvemos la URL original como fallback
      return imageUrl;
    } catch (fallbackError) {
      console.error('Error en método alternativo:', fallbackError);
      return imageUrl; // Devolver la URL original si todo falla
    }
  }
};

// Procesar todas las propiedades de la plantilla que contengan imágenes
const processTemplateProps = async (props: any): Promise<any> => {
  const processedProps = { ...props };
  
  // Convertir la imagen principal
  if (props.imageUrl) {
    try {
      processedProps.imageUrl = await convertImageToBase64(props.imageUrl);
      console.log('Imagen principal convertida exitosamente');
    } catch (error) {
      console.error('Error al convertir imagen principal:', error);
      processedProps.imageUrl = props.imageUrl; // Fallback a URL original
    }
  }
  
  // Convertir el logo a base64
  try {
    const logoUrl = "https://cuidadoseguro.com.co/csc3/wp-content/uploads/2025/04/CULTURA-DIGITAL-CURVAS1.svg";
    processedProps.logoBase64 = await convertImageToBase64(logoUrl);
    console.log('Logo convertido exitosamente');
  } catch (error) {
    console.error('Error al convertir el logo:', error);
    // Si falla, no incluimos el logoBase64 y se usará la URL directa
  }
  
  return processedProps;
};

export const sendEmail = async (options: EmailSendOptions): Promise<EmailResponse> => {
  try {
    console.log("Preparando envío de email:", {
      to: options.to,
      subject: options.subject,
      from: { email: "onboarding@resend.dev", name: "Programa Cultura Digital" },
    });

    // Si templateId y templateProps están definidos, generamos el HTML
    let finalHtmlContent = options.htmlContent;
    
    if (options.templateId && options.templateProps) {
      try {
        // Procesar todas las imágenes a base64 primero
        console.log('Procesando imágenes de la plantilla...');
        const processedProps = await processTemplateProps(options.templateProps);
        console.log('Imágenes procesadas, generando HTML de la plantilla...');
        
        // Generar el HTML desde el componente de plantilla seleccionado con props procesados
        const templateComponent = getTemplateComponent(options.templateId, processedProps);
        
        // Usar renderToStaticMarkup para asegurar un HTML limpio sin atributos de React
        finalHtmlContent = ReactDOMServer.renderToStaticMarkup(templateComponent);
        console.log('HTML de la plantilla generado correctamente');
        
        // Envolver la plantilla con la estructura de documento HTML adecuada
        finalHtmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <title>${options.subject}</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: 'Poppins', sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                background-color: #f9f9f9;
              }
              img {
                max-width: 100%;
                height: auto;
                display: block;
                border: 0;
                outline: none;
                line-height: 100%;
              }
              a {
                text-decoration: none;
              }
              p {
                margin-top: 0;
                margin-bottom: 1rem;
              }
              * {
                box-sizing: border-box;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
              }
              table {
                border-spacing: 0;
                border-collapse: collapse;
              }
              td {
                padding: 0;
              }
            </style>
          </head>
          <body>
            ${finalHtmlContent}
          </body>
          </html>
        `;
      } catch (renderError) {
        console.error("Error al renderizar la plantilla:", renderError);
        // Fallback a un HTML básico si falla el renderizado
        finalHtmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>${options.subject}</h1>
            <p>${options.templateProps?.content || "No se pudo cargar el contenido de la plantilla."}</p>
          </div>
        `;
      }
    }
    
    console.log('Enviando solicitud a la función edge...');
    // Enviar la solicitud a la función edge
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: options.to,
        subject: options.subject,
        htmlContent: finalHtmlContent
      }
    });

    if (error) {
      console.error("Error al invocar la función edge:", error);
      return {
        success: false,
        message: `Error al enviar el email: ${error.message}`
      };
    }

    if (data?.error) {
      console.error("Error del servicio de email:", data.error);
      return {
        success: false,
        message: `Error del servicio de email: ${data.error}`
      };
    }

    console.log('Email enviado exitosamente:', data);
    return {
      success: true,
      message: "Correo enviado exitosamente a branzontech@gmail.com",
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

// Helper function to get the right template component based on templateId
const getTemplateComponent = (templateId: string, props: any) => {
  switch (templateId) {
    case "template1": return React.createElement(TemplateOne, props);
    case "template2": return React.createElement(TemplateTwo, props);
    case "template3": return React.createElement(TemplateThree, props);
    case "template4": return React.createElement(TemplateFour, props);
    case "template5": return React.createElement(TemplateFive, props);
    case "template6": return React.createElement(TemplateSix, props);
    case "template7": return React.createElement(TemplateSeven, props);
    case "template8": return React.createElement(TemplateEight, props);
    case "template9": return React.createElement(TemplateNine, props);
    default: return React.createElement(TemplateOne, props);
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

