
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

// Helper function to convert an image URL to a base64 data URL
const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    // Skip conversion for data URLs (already base64)
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error(`Failed to fetch image: ${imageUrl}`);
      return imageUrl; // Return original URL on failure
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Convert to base64
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    
    // Determine MIME type from URL or response
    const contentType = response.headers.get('content-type') || 
      imageUrl.endsWith('.svg') ? 'image/svg+xml' : 
      imageUrl.endsWith('.png') ? 'image/png' : 
      imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg') ? 'image/jpeg' : 
      'image/png';
    
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return imageUrl; // Return original URL on error
  }
};

// Process template props to convert all image URLs to base64
const processTemplateProps = async (props: any): Promise<any> => {
  const processedProps = { ...props };
  
  if (props.imageUrl) {
    processedProps.imageUrl = await convertImageToBase64(props.imageUrl);
  }
  
  return processedProps;
};

export const sendEmail = async (options: EmailSendOptions): Promise<EmailResponse> => {
  try {
    console.log("Intentando enviar email con opciones:", {
      to: options.to,
      subject: options.subject,
      from: { email: "onboarding@resend.dev", name: "Programa Cultura Digital" },
    });

    // If templateId and templateProps are provided, generate the HTML content from the template
    let finalHtmlContent = options.htmlContent;
    
    if (options.templateId && options.templateProps) {
      try {
        // Process image URLs to base64 first
        const processedProps = await processTemplateProps(options.templateProps);
        
        // Generate HTML from the selected template component with processed props
        const templateComponent = getTemplateComponent(options.templateId, processedProps);
        
        // Server-side rendering with optimized settings
        finalHtmlContent = ReactDOMServer.renderToStaticMarkup(templateComponent);
        
        // Wrap the template with proper HTML document structure
        finalHtmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <title>${options.subject}</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: 'Poppins', sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              img {
                max-width: 100%;
                height: auto;
                display: block;
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
        // Fallback to a basic HTML if rendering fails
        finalHtmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>${options.subject}</h1>
            <p>${options.templateProps?.content || "No se pudo cargar el contenido de la plantilla."}</p>
          </div>
        `;
      }
    }
    
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: options.to,
        subject: options.subject,
        htmlContent: finalHtmlContent
      }
    });

    if (error) {
      console.error("Error al enviar email:", error);
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
