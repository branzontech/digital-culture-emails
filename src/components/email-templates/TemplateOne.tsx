
import React from "react";

interface TemplateOneProps {
  subject: string;
  heading: string;
  subheading: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  logoBase64?: string;
}

const TemplateOne: React.FC<TemplateOneProps> = ({
  subject,
  heading,
  subheading,
  content,
  buttonText,
  buttonUrl,
  imageUrl,
  logoBase64,
}) => {
  const logoSrc = logoBase64 || "https://cuidadoseguro.com.co/csc3/wp-content/uploads/2025/04/CULTURA-DIGITAL-CURVAS1.svg";
  
  return (
    <table cellPadding="0" cellSpacing="0" border="0" width="100%" style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}>
      <tr>
        <td align="center" bgcolor="#0052A5" style={{ padding: "20px 0" }}>
          <img 
            src={logoSrc}
            alt="Cultura Digital" 
            style={{ height: "60px", display: "block", margin: "0 auto" }}
          />
        </td>
      </tr>
      
      <tr>
        <td bgcolor="#f0f0f0" style={{ padding: "15px", borderBottom: "3px solid #FFD800" }}>
          <h2 style={{ margin: 0, color: "#0052A5", fontSize: "18px" }}>
            {subject || "Consejos y Tips de Tecnología - Cultura Digital"}
          </h2>
        </td>
      </tr>
      
      <tr>
        <td bgcolor="#ffffff" style={{ padding: "30px 20px" }}>
          <h1 style={{ color: "#0052A5", fontSize: "24px", marginTop: 0, fontWeight: "600" }}>
            {heading || "Tips de Tecnología de la Semana"}
          </h1>
          
          <h3 style={{ color: "#555555", fontSize: "18px", marginBottom: "20px", fontWeight: "500" }}>
            {subheading || "Mejora tu productividad con estos consejos"}
          </h3>
          
          <div style={{ marginBottom: "25px" }}>
            <img 
              src={imageUrl} 
              alt="Imagen destacada" 
              style={{ maxWidth: "100%", height: "auto", display: "block", borderRadius: "4px", margin: "0 auto" }}
            />
          </div>
          
          <div style={{ color: "#333333", fontSize: "16px", lineHeight: "1.6", marginBottom: "25px" }}>
            {content || `Estimado equipo:

Compartimos con ustedes los tips tecnológicos de esta semana que ayudarán a mejorar la seguridad y eficiencia en nuestras operaciones diarias.

• Mantenga sus aplicaciones siempre actualizadas
• Utilice contraseñas fuertes y diferentes para cada servicio
• Active la autenticación de dos factores cuando sea posible
• Realice copias de seguridad periódicamente`}
          </div>
          
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <a 
              href={buttonUrl} 
              style={{ 
                backgroundColor: "#FFD800", 
                color: "#0052A5", 
                padding: "12px 25px", 
                textDecoration: "none", 
                borderRadius: "4px", 
                fontWeight: "bold",
                display: "inline-block"
              }}
            >
              {buttonText}
            </a>
          </div>
        </td>
      </tr>
      
      <tr>
        <td bgcolor="#0052A5" style={{ padding: "20px", color: "white", textAlign: "center" }}>
          <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
            © 2025 Cultura Digital - Todos los derechos reservados
          </p>
          <p style={{ margin: "0", fontSize: "12px" }}>
            Este correo fue enviado como parte del programa de Cultura Digital.
          </p>
        </td>
      </tr>
    </table>
  );
};

export default TemplateOne;
