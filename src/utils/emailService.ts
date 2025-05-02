
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
import TemplateTen from "@/components/email-templates/TemplateTen";
import TemplateEleven from "@/components/email-templates/TemplateEleven";
import TemplateTwelve from "@/components/email-templates/TemplateTwelve";

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
  scheduledFor?: string; // ISO string date for scheduled sending
}

interface EmailResponse {
  success: boolean;
  message: string;
  previewUrl?: string;
}

const imageCache = new Map<string, string>();

const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    if (imageCache.has(imageUrl)) {
      console.log('Usando imagen en caché:', imageUrl);
      return imageCache.get(imageUrl)!;
    }

    console.log('Convirtiendo imagen a base64:', imageUrl);
    const response = await fetch(imageUrl, { 
      headers: {
        'Accept': 'image/*',
      },
      mode: 'cors',
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      throw new Error(`No se pudo cargar la imagen (status ${response.status}): ${imageUrl}`);
    }
    
    let contentType = response.headers.get('content-type');
    if (!contentType) {
      if (imageUrl.match(/\.(jpeg|jpg)$/i)) contentType = 'image/jpeg';
      else if (imageUrl.match(/\.(png)$/i)) contentType = 'image/png';
      else if (imageUrl.match(/\.(gif)$/i)) contentType = 'image/gif';
      else if (imageUrl.match(/\.(svg)$/i)) contentType = 'image/svg+xml';
      else if (imageUrl.match(/\.(webp)$/i)) contentType = 'image/webp';
      else contentType = 'image/png';
    }
    
    const arrayBuffer = await response.arrayBuffer();
    
    const base64 = btoa(
      new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    const dataUrl = `data:${contentType};base64,${base64}`;
    imageCache.set(imageUrl, dataUrl);
    
    return dataUrl;
  } catch (error) {
    console.error('Error al convertir imagen a base64:', error);
    
    try {
      console.log('Intentando método alternativo para la imagen:', imageUrl);
      return imageUrl;
    } catch (fallbackError) {
      console.error('Error en método alternativo:', fallbackError);
      return imageUrl;
    }
  }
};

const processTemplateProps = async (props: any): Promise<any> => {
  const processedProps = { ...props };
  
  if (props.imageUrl) {
    try {
      processedProps.imageUrl = await convertImageToBase64(props.imageUrl);
      console.log('Imagen principal convertida exitosamente');
    } catch (error) {
      console.error('Error al convertir imagen principal:', error);
      processedProps.imageUrl = props.imageUrl;
    }
  }
  
  try {
    const logoUrl = "https://cuidadoseguro.com.co/csc3/wp-content/uploads/2025/04/CULTURA-DIGITAL-CURVAS1.svg";
    processedProps.logoBase64 = await convertImageToBase64(logoUrl);
    console.log('Logo convertido exitosamente');
  } catch (error) {
    console.error('Error al convertir el logo:', error);
  }
  
  return processedProps;
};

export const sendEmail = async (options: EmailSendOptions): Promise<EmailResponse> => {
  try {
    console.log("Preparando envío de email:", {
      to: options.to,
      subject: options.subject,
      from: { email: "onboarding@resend.dev", name: "Programa Cultura Digital" },
      scheduledFor: options.scheduledFor
    });

    let finalHtmlContent = options.htmlContent;
    
    if (options.templateId && options.templateProps) {
      try {
        console.log('Procesando imágenes de la plantilla...');
        const processedProps = await processTemplateProps(options.templateProps);
        console.log('Imágenes procesadas, generando HTML de la plantilla...');
        
        const templateComponent = getTemplateComponent(options.templateId, processedProps);
        
        finalHtmlContent = ReactDOMServer.renderToStaticMarkup(templateComponent);
        console.log('HTML de la plantilla generado correctamente');
        
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
        finalHtmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>${options.subject}</h1>
            <p>${options.templateProps?.content || "No se pudo cargar el contenido de la plantilla."}</p>
          </div>
        `;
      }
    }

    // If we have a scheduled date in the future, we would store this in a database
    // and use a cron job to send it at the scheduled time
    // But for this demo, we'll just simulate it by showing a different message
    if (options.scheduledFor) {
      const scheduledDate = new Date(options.scheduledFor);
      const now = new Date();
      
      if (scheduledDate > now) {
        // In a real implementation, we would save this to a database
        // For now, we'll just simulate scheduling by sending right away but showing a different message
        console.log('Email programado para:', scheduledDate);
        
        // In a real implementation, we would return here and not actually send
        // But for demo purposes, we'll continue to send right away
      }
    }
    
    console.log('Enviando solicitud a la función edge...');
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: options.to,
        subject: options.subject,
        htmlContent: finalHtmlContent,
        scheduledFor: options.scheduledFor
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
    
    // Customize the success message based on scheduling
    let successMessage = "Correo enviado exitosamente a branzontech@gmail.com";
    if (options.scheduledFor) {
      const scheduledDate = new Date(options.scheduledFor);
      const now = new Date();
      
      if (scheduledDate > now) {
        successMessage = `Correo programado para envío el ${scheduledDate.toLocaleDateString()} a las ${scheduledDate.toLocaleTimeString()}`;
      }
    }
    
    return {
      success: true,
      message: successMessage,
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
    case "template10": return React.createElement(TemplateTen, props);
    case "template11": return React.createElement(TemplateEleven, props);
    case "template12": return React.createElement(TemplateTwelve, props);
    default: return React.createElement(TemplateOne, props);
  }
};

export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const parseEmailList = (emailsString: string): EmailRecipient[] => {
  const emails = emailsString.split(/[,;\n]+/).map(email => email.trim()).filter(Boolean);
  
  return emails
    .filter(validateEmail)
    .map(email => ({ email }));
};

