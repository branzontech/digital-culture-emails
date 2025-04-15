
import { supabase } from "@/integrations/supabase/client";
import { isProd } from "@/lib/utils";
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
      // Generate HTML from the selected template component
      const templateComponent = getTemplateComponent(options.templateId, options.templateProps);
      finalHtmlContent = ReactDOMServer.renderToString(templateComponent);
      
      // Wrap the template with proper HTML document structure
      finalHtmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <title>${options.subject}</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Poppins', sans-serif;">
          ${finalHtmlContent}
        </body>
        </html>
      `;
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
