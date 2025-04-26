
import React from "react";

interface TemplateSeventeenProps {
  subject: string;
  heading: string;
  subheading: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  glassEffect?: boolean;
  gradientColors?: [string, string];
  borderStyle?: "none" | "rounded" | "sharp";
  contentLayout?: "standard" | "overlap" | "columns";
}

const TemplateSeventeen: React.FC<TemplateSeventeenProps> = ({
  subject,
  heading,
  subheading,
  content,
  buttonText,
  buttonUrl,
  imageUrl,
  glassEffect = true,
  gradientColors = ["#8B5CF6", "#D946EF"],
  borderStyle = "rounded",
  contentLayout = "standard"
}) => {
  const getBorderRadius = () => {
    switch (borderStyle) {
      case "rounded": return "12px";
      case "sharp": return "0";
      default: return "0";
    }
  };

  const getGlassStyle = () => {
    if (!glassEffect) return {};
    return {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)"
    };
  };

  const getContentLayout = () => {
    switch (contentLayout) {
      case "overlap":
        return {
          margin: "-60px 20px 0",
          position: "relative" as const,
          backgroundColor: "#ffffff",
          borderRadius: getBorderRadius(),
          padding: "30px"
        };
      case "columns":
        return {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          padding: "30px"
        };
      default:
        return {
          padding: "30px"
        };
    }
  };

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "0 auto",
      fontFamily: "'Poppins', sans-serif",
      background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
      borderRadius: getBorderRadius(),
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{ 
        padding: "40px 20px",
        textAlign: "center",
        color: "#ffffff",
        ...getGlassStyle()
      }}>
        <span style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "#ffffff",
          padding: "6px 16px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "25px",
          display: "inline-block",
          ...getGlassStyle()
        }}>
          {subject}
        </span>

        <h1 style={{ 
          fontSize: "36px",
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

      {/* Featured Image */}
      <div style={{ 
        padding: contentLayout === "overlap" ? "0 0 60px 0" : "0"
      }}>
        <img 
          src={imageUrl} 
          alt="Featured" 
          style={{ 
            width: "100%",
            display: "block",
            height: contentLayout === "overlap" ? "300px" : "auto",
            objectFit: "cover"
          }}
        />
      </div>

      {/* Main Content */}
      <div style={{
        backgroundColor: "#ffffff",
        ...getContentLayout()
      }}>
        {contentLayout === "columns" ? (
          <>
            <div>
              <img 
                src={imageUrl} 
                alt="Featured" 
                style={{ 
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "20px"
                }}
              />
            </div>
            <div>
              <div style={{ 
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#444444",
                whiteSpace: "pre-line",
                marginBottom: "30px"
              }}>
                {content}
              </div>

              <a
                href={buttonUrl}
                style={{
                  background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                  color: "#ffffff",
                  padding: "12px 28px",
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
          </>
        ) : (
          <>
            <div style={{ 
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#444444",
              whiteSpace: "pre-line",
              marginBottom: "30px"
            }}>
              {content}
            </div>

            <div style={{ textAlign: "center" }}>
              <a
                href={buttonUrl}
                style={{
                  background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                  color: "#ffffff",
                  padding: "12px 28px",
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
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ 
        padding: "20px",
        textAlign: "center",
        color: "#ffffff",
        ...getGlassStyle()
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

export default TemplateSeventeen;
