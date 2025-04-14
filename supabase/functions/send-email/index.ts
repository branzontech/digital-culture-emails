
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Check if the API key is available
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
          previewUrl: null // For testing mode
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

    const { to, subject, htmlContent, from } = await req.json()

    console.log("Attempting to send email with:", { to, subject, from })
    
    const data = await resend.emails.send({
      from: from || "Programa Cultura Digital <onboarding@resend.dev>",
      to: Array.isArray(to) ? to.map(r => r.email) : [to.email],
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", data)

    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      },
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    )
  }
})
