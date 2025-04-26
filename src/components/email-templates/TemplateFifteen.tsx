
import React from "react";

interface TemplateFifteenProps {
  subject: string;
  heading: string;
  subheading: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  theme?: "light" | "dark" | "colorful";
  accentColor?: string;
  layout?: "centered" | "side-image" | "full-width";
}

const TemplateFifteen: React.FC<TemplateFifteenProps> = ({
  subject,
  heading,
  subheading,
  content,
  buttonText,
  buttonUrl,
  imageUrl,
  theme = "light",
  accentColor = "#F97316",
  layout = "centered"
}) => {
  const themeStyles = {
    light: {
      background: "#ffffff",
      text: "#333333",
      subtext: "#666666",
      card: "#f8f8f8"
    },
    dark: {
      background: "#1a1a1a",
      text: "#ffffff",
      subtext: "#cccccc",
      card: "#2a2a2a"
    },
    colorful: {
      background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)`,
      text: "#333333",
      subtext: "#666666",
      card: "#ffffff"
    }
  };

  const currentTheme = themeStyles[theme];

  const getLayoutStyles = () => {
    switch (layout) {
      case "side-image":
        return {
          container: { display: "flex", gap: "20px", alignItems: "center" },
          image: { flex: "1", maxWidth: "250px" },
          content: { flex: "1" }
        };
      case "full-width":
        return {
          container: { margin: "-20px" },
          image: { width: "100%", maxHeight: "300px", objectFit: "cover" as const },
          content: { padding: "20px" }
        };
      default:
        return {
          container: {},
          image: { maxWidth: "100%", marginBottom: "20px" },
          content: {}
        };
    }
  };

  const layoutStyle = getLayoutStyles();

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "0 auto",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: currentTheme.background,
      color: currentTheme.text,
      padding: "20px"
    }}>
      {/* Subject Line */}
      <div style={{ 
        textAlign: "center",
        marginBottom: "30px"
      }}>
        <span style={{ 
          backgroundColor: accentColor,
          color: "#ffffff",
          padding: "6px 16px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "500"
        }}>
          {subject}
        </span>
      </div>

      {/* Main Content */}
      <div style={layoutStyle.container}>
        {layout !== "full-width" && (
          <img 
            src={imageUrl} 
            alt="Featured" 
            style={layoutStyle.image}
          />
        )}
        
        <div style={layoutStyle.content}>
          {layout === "full-width" && (
            <img 
              src={imageUrl} 
              alt="Featured" 
              style={layoutStyle.image}
            />
          )}
          
          <h1 style={{ 
            fontSize: "28px",
            margin: "0 0 15px 0",
            fontWeight: "600",
            color: currentTheme.text
          }}>
            {heading}
          </h1>

          <p style={{ 
            fontSize: "16px",
            margin: "0 0 25px 0",
            color: currentTheme.subtext
          }}>
            {subheading}
          </p>

          <div style={{ 
            backgroundColor: currentTheme.card,
            padding: "25px",
            borderRadius: "8px",
            marginBottom: "30px",
            fontSize: "15px",
            lineHeight: "1.6",
            whiteSpace: "pre-line"
          }}>
            {content}
          </div>

          {/* Button */}
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
                fontWeight: "500",
                textTransform: "uppercase",
                fontSize: "14px",
                letterSpacing: "0.5px"
              }}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        marginTop: "40px",
        textAlign: "center",
        borderTop: `1px solid ${currentTheme.text}22`,
        paddingTop: "20px"
      }}>
        <p style={{ 
          margin: "0",
          fontSize: "14px",
          color: currentTheme.subtext
        }}>
          © 2025 Programa de Cultura Digital
        </p>
      </div>
    </div>
  );
};

export default TemplateFifteen;
