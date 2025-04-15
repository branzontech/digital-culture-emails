
import React from "react";

interface TemplateOneProps {
  subject: string;
  heading: string;
  subheading: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  logoBase64?: string; // Nuevo prop para el logo en base64
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
  // Usamos el logo en base64 si está disponible, de lo contrario usamos la URL directa
  const logoSrc = logoBase64 || "https://cuidadoseguro.com.co/csc3/wp-content/uploads/2025/04/CULTURA-DIGITAL-CURVAS1.svg";
  
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "20px 0", backgroundColor: "#0052A5" }}>
        <img 
          src={logoSrc}
          alt="Cultura Digital" 
          style={{ height: "60px" }}
        />
      </div>
      
      {/* Email Subject */}
      <div style={{ padding: "15px", backgroundColor: "#f0f0f0", borderBottom: "3px solid #FFD800" }}>
        <h2 style={{ margin: 0, color: "#0052A5", fontSize: "18px" }}>
          {subject || "Consejos y Tips de Tecnología - Cultura Digital"}
        </h2>
      </div>
      
      {/* Main Content */}
      <div style={{ padding: "30px 20px", backgroundColor: "#ffffff" }}>
        {/* Title */}
        <h1 style={{ color: "#0052A5", fontSize: "24px", marginTop: 0, fontWeight: "600" }}>
          {heading || "Tips de Tecnología de la Semana"}
        </h1>
        
        {/* Subtitle */}
        <h3 style={{ color: "#555555", fontSize: "18px", marginBottom: "20px", fontWeight: "500" }}>
          {subheading || "Mejora tu productividad con estos consejos"}
        </h3>
        
        {/* Image */}
        <div style={{ marginBottom: "25px" }}>
          <img 
            src={imageUrl} 
            alt="Imagen destacada" 
            style={{ maxWidth: "100%", height: "auto", display: "block", borderRadius: "4px" }}
          />
        </div>
        
        {/* Content */}
        <div style={{ color: "#333333", fontSize: "16px", lineHeight: "1.6", marginBottom: "25px" }}>
          {content || `Estimado equipo:

Compartimos con ustedes los tips tecnológicos de esta semana que ayudarán a mejorar la seguridad y eficiencia en nuestras operaciones diarias.

• Mantenga sus aplicaciones siempre actualizadas
• Utilice contraseñas fuertes y diferentes para cada servicio
• Active la autenticación de dos factores cuando sea posible
• Realice copias de seguridad periódicamente`}
        </div>
        
        {/* Button */}
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
      </div>
      
      {/* Footer */}
      <div style={{ padding: "20px", backgroundColor: "#0052A5", color: "white", textAlign: "center" }}>
        <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
          © 2025 Cultura Digital - Todos los derechos reservados
        </p>
        <p style={{ margin: "0", fontSize: "12px" }}>
          Este correo fue enviado como parte del programa de Cultura Digital.
        </p>
      </div>
    </div>
  );
};

export default TemplateOne;
