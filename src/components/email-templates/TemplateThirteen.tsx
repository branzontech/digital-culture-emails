
import React from "react";

interface TemplateThirteenProps {
  subject: string;
  heading: string;
  subheading: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  headerStyle?: "gradient" | "solid" | "image";
}

const TemplateThirteen: React.FC<TemplateThirteenProps> = ({
  subject,
  heading,
  subheading,
  content,
  buttonText,
  buttonUrl,
  imageUrl,
  accentColor = "#8B5CF6",
  backgroundColor = "#ffffff",
  textColor = "#333333",
  fontFamily = "'Poppins', sans-serif",
  headerStyle = "gradient"
}) => {
  const headerBackground = headerStyle === "gradient" 
    ? `linear-gradient(135deg, ${accentColor}dd, ${accentColor})`
    : headerStyle === "image" 
      ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${imageUrl})`
      : accentColor;

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "0 auto", 
      fontFamily, 
      backgroundColor,
      color: textColor
    }}>
      {/* Header */}
      <div style={{ 
        background: headerBackground,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px 20px",
        textAlign: "center",
        color: "#ffffff",
      }}>
        <h1 style={{ 
          fontSize: "32px",
          margin: "0 0 15px 0",
          fontWeight: "600"
        }}>{heading}</h1>
        <p style={{ 
          fontSize: "18px",
          margin: "0",
          opacity: "0.9"
        }}>{subheading}</p>
      </div>

      {/* Subject Badge */}
      <div style={{ 
        backgroundColor: accentColor,
        margin: "-20px 20px 20px 20px",
        padding: "10px 20px",
        borderRadius: "25px",
        color: "#ffffff",
        textAlign: "center",
        position: "relative"
      }}>
        {subject}
      </div>

      {/* Content */}
      <div style={{ padding: "30px 20px" }}>
        <div style={{ 
          backgroundColor: `${accentColor}11`,
          padding: "25px",
          borderRadius: "8px",
          marginBottom: "30px"
        }}>
          <div style={{ 
            whiteSpace: "pre-line",
            lineHeight: "1.6"
          }}>{content}</div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center" }}>
          <a
            href={buttonUrl}
            style={{
              backgroundColor: accentColor,
              color: "#ffffff",
              padding: "12px 30px",
              borderRadius: "25px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "500"
            }}
          >
            {buttonText}
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        borderTop: `3px solid ${accentColor}22`,
        padding: "20px",
        textAlign: "center",
        color: `${textColor}99`
      }}>
        <p style={{ margin: "0", fontSize: "14px" }}>
          © 2025 Programa de Cultura Digital
        </p>
      </div>
    </div>
  );
};

export default TemplateThirteen;
