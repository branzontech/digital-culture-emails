
import React from "react";

interface TemplateFourteenProps {
  subject: string;
  heading: string;
  subheading: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  primaryColor?: string;
  secondaryColor?: string;
  cardStyle?: "floating" | "bordered" | "minimal";
  imageStyle?: "circle" | "square" | "rounded";
}

const TemplateFourteen: React.FC<TemplateFourteenProps> = ({
  subject,
  heading,
  subheading,
  content,
  buttonText,
  buttonUrl,
  imageUrl,
  primaryColor = "#D946EF",
  secondaryColor = "#F1F0FB",
  cardStyle = "floating",
  imageStyle = "rounded"
}) => {
  const getImageStyle = () => {
    switch (imageStyle) {
      case "circle": return { borderRadius: "50%" };
      case "square": return { borderRadius: "0" };
      default: return { borderRadius: "8px" };
    }
  };

  const getCardStyle = () => {
    switch (cardStyle) {
      case "floating": return {
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "none",
        borderRadius: "12px"
      };
      case "bordered": return {
        border: `2px solid ${primaryColor}22`,
        borderRadius: "12px"
      };
      default: return {};
    }
  };

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "0 auto",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#ffffff" 
    }}>
      {/* Top Bar */}
      <div style={{ 
        height: "6px", 
        background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}aa)`
      }}></div>

      {/* Header Image */}
      <div style={{ 
        padding: "30px 20px",
        textAlign: "center"
      }}>
        <img 
          src={imageUrl} 
          alt="Header" 
          style={{ 
            maxWidth: "200px",
            ...getImageStyle()
          }}
        />
      </div>

      {/* Content Card */}
      <div style={{ 
        margin: "0 20px",
        backgroundColor: secondaryColor,
        padding: "30px",
        ...getCardStyle()
      }}>
        {/* Subject */}
        <div style={{ 
          color: primaryColor,
          fontSize: "14px",
          fontWeight: "600",
          marginBottom: "15px",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          {subject}
        </div>

        {/* Heading */}
        <h1 style={{ 
          margin: "0 0 10px 0",
          color: "#333333",
          fontSize: "26px",
          lineHeight: "1.3"
        }}>
          {heading}
        </h1>

        {/* Subheading */}
        <p style={{ 
          margin: "0 0 25px 0",
          color: "#666666",
          fontSize: "16px",
          lineHeight: "1.5"
        }}>
          {subheading}
        </p>

        {/* Main Content */}
        <div style={{ 
          color: "#444444",
          fontSize: "15px",
          lineHeight: "1.6",
          whiteSpace: "pre-line",
          marginBottom: "30px"
        }}>
          {content}
        </div>

        {/* Button */}
        <div style={{ textAlign: "center" }}>
          <a
            href={buttonUrl}
            style={{
              backgroundColor: primaryColor,
              color: "#ffffff",
              padding: "14px 28px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500",
              display: "inline-block",
              textTransform: "uppercase",
              fontSize: "14px",
              letterSpacing: "0.5px"
            }}
          >
            {buttonText}
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        padding: "30px 20px",
        textAlign: "center"
      }}>
        <p style={{ 
          margin: "0",
          color: "#999999",
          fontSize: "14px"
        }}>
          © 2025 Programa de Cultura Digital
        </p>
      </div>
    </div>
  );
};

export default TemplateFourteen;
