
import React from "react";

interface TemplateSixteenProps {
  subject: string;
  heading: string;
  subheading: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  primaryColor?: string;
  accentColor?: string;
  headerLayout?: "minimal" | "wave" | "diagonal";
  contentStyle?: "card" | "sections" | "clean";
}

const TemplateSixteen: React.FC<TemplateSixteenProps> = ({
  subject,
  heading,
  subheading,
  content,
  buttonText,
  buttonUrl,
  imageUrl,
  primaryColor = "#0EA5E9",
  accentColor = "#FFD800",
  headerLayout = "wave",
  contentStyle = "card"
}) => {
  const getHeaderStyle = () => {
    const baseStyle = {
      backgroundColor: primaryColor,
      padding: "60px 20px",
      color: "#ffffff",
      textAlign: "center" as const,
      position: "relative" as const
    };

    switch (headerLayout) {
      case "wave":
        return {
          ...baseStyle,
          paddingBottom: "100px",
          "&::after": {
            content: "''",
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "40px",
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23ffffff'/%3E%3C/svg%3E") no-repeat bottom`,
            backgroundSize: "cover"
          }
        };
      case "diagonal":
        return {
          ...baseStyle,
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)"
        };
      default:
        return baseStyle;
    }
  };

  const getContentStyle = () => {
    switch (contentStyle) {
      case "card":
        return {
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          margin: "-40px 20px 20px",
          padding: "30px",
          position: "relative" as const
        };
      case "sections":
        return {
          backgroundColor: "#ffffff",
          margin: "20px",
          "& > div": {
            borderBottom: "1px solid #eee",
            padding: "20px 0"
          }
        };
      default:
        return {
          backgroundColor: "#ffffff",
          padding: "20px"
        };
    }
  };

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "0 auto",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f8f8f8"
    }}>
      {/* Header */}
      <div style={getHeaderStyle()}>
        <span style={{ 
          backgroundColor: accentColor,
          color: primaryColor,
          padding: "6px 16px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "25px",
          display: "inline-block"
        }}>
          {subject}
        </span>

        <h1 style={{ 
          fontSize: "32px",
          margin: "20px 0 10px",
          fontWeight: "700"
        }}>
          {heading}
        </h1>

        <p style={{ 
          fontSize: "18px",
          margin: "0",
          opacity: "0.9"
        }}>
          {subheading}
        </p>
      </div>

      {/* Main Content */}
      <div style={getContentStyle()}>
        {/* Featured Image */}
        <img 
          src={imageUrl} 
          alt="Featured" 
          style={{ 
            width: "100%",
            borderRadius: "8px",
            marginBottom: "25px"
          }}
        />

        {/* Content */}
        <div style={{ 
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#444444",
          whiteSpace: "pre-line",
          marginBottom: "30px"
        }}>
          {content}
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: "center" }}>
          <a
            href={buttonUrl}
            style={{
              backgroundColor: primaryColor,
              color: "#ffffff",
              padding: "14px 32px",
              borderRadius: "30px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "600",
              boxShadow: `0 4px 12px ${primaryColor}40`
            }}
          >
            {buttonText}
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: "center",
        padding: "30px 20px",
        color: "#666666"
      }}>
        <p style={{ 
          margin: "0",
          fontSize: "14px"
        }}>
          © 2025 Programa de Cultura Digital
        </p>
      </div>
    </div>
  );
};

export default TemplateSixteen;
