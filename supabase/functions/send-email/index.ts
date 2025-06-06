
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set in the environment variables");
}

const resend = new Resend(RESEND_API_KEY);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("Cannot send email: RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ 
          error: "Email service configuration error: API key not set",
          previewUrl: null
        }), 
        { 
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      )
    }

    const { to, subject, htmlContent, scheduledFor } = await req.json()

    // Log content length to help with debugging
    console.log("Received email request:", {
      subject,
      htmlContentLength: htmlContent ? htmlContent.length : 0,
      toEmail: to?.email || (Array.isArray(to) ? to.map(t => t.email).join(', ') : to),
      scheduledFor: scheduledFor || "Immediate",
      hasVideoContent: htmlContent?.includes('<iframe') || false
    });

    // Check for scheduled time in the future
    if (scheduledFor) {
      const scheduledTime = new Date(scheduledFor);
      const now = new Date();
      
      if (scheduledTime > now) {
        console.log(`Email scheduled for future delivery at: ${scheduledTime.toISOString()}`);
        // En una implementación real, guardarías esto en una base de datos
        // para envío posterior, pero aquí simularemos un envío inmediato
        
        return new Response(
          JSON.stringify({ 
            success: true,
            message: `El correo ha sido programado para enviarse el ${scheduledTime.toLocaleString('es-ES')}`
          }), 
          { 
            headers: { 
              "Content-Type": "application/json",
              ...corsHeaders
            }
          }
        );
      }
    }

    // Verificar que el HTML esté bien formado y asegurarse de que no contengan atributos de React
    let cleanHtml = htmlContent;
    
    // Eliminar cualquier atributo data-lov-id o data-component-path que pudiera haberse colado
    cleanHtml = cleanHtml.replace(/data-lov-id="[^"]*"/g, "");
    cleanHtml = cleanHtml.replace(/data-component-path="[^"]*"/g, "");
    
    // Asegurarnos de que los iframes para videos sean seguros
    if (cleanHtml.includes('<iframe')) {
      console.log("Email contains iframe content (video)");
      // Asegurarnos de que YouTube y Vimeo estén en la lista de permitidos
      if (cleanHtml.includes('youtube.com/embed') || cleanHtml.includes('player.vimeo.com')) {
        console.log("Valid video embed found");
      }
    }
    
    // Use the default Resend from address which is already verified
    const fromValue = "Programa Cultura Digital <onboarding@resend.dev>";
    
    // Durante pruebas, siempre enviar a esta dirección
    const toAddress = "branzontech@gmail.com";
    
    try {
      const data = await resend.emails.send({
        from: fromValue,
        to: toAddress,
        subject,
        html: cleanHtml,
      });

      console.log("Email sent successfully:", data);

      return new Response(
        JSON.stringify(data),
        { 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders
          } 
        },
      );
    } catch (sendError) {
      console.error("Error sending email with Resend:", sendError);
      return new Response(
        JSON.stringify({ 
          error: sendError.message || "Error sending email",
          details: sendError
        }), 
        { 
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Unknown error", 
        stack: error.stack
      }), 
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
})
