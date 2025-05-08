
import React from 'react';

interface VideoTemplateProps {
  subject?: string;
  heading: string;
  subheading: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  videoUrl?: string;
  logoBase64?: string;
}

const VideoTemplate: React.FC<VideoTemplateProps> = ({
  heading,
  subheading,
  content,
  buttonText,
  buttonUrl,
  imageUrl,
  videoUrl,
  logoBase64,
}) => {
  // Función para extraer ID de YouTube de la URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    let videoId = '';
    
    // Patrones comunes de URL de YouTube
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        videoId = match[1];
        break;
      }
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };
  
  // Determine si es un enlace de video de YouTube o Vimeo
  const isYouTube = videoUrl?.includes('youtube') || videoUrl?.includes('youtu.be');
  const isVimeo = videoUrl?.includes('vimeo');
  
  // Genera el iframe adecuado según el tipo de video
  const renderVideoEmbed = () => {
    if (!videoUrl) return null;
    
    if (isYouTube) {
      const embedUrl = getYouTubeEmbedUrl(videoUrl);
      if (!embedUrl) return null;
      
      return (
        <iframe 
          width="100%" 
          height="315" 
          src={embedUrl}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      );
    } else if (isVimeo) {
      const vimeoId = videoUrl.match(/(?:vimeo\.com\/)(\d+)/i)?.[1];
      if (!vimeoId) return null;
      
      return (
        <iframe 
          src={`https://player.vimeo.com/video/${vimeoId}`} 
          width="100%" 
          height="315" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
        ></iframe>
      );
    }
    
    // Si no es YouTube ni Vimeo, mostrar un enlace al video
    return (
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" style={{ 
          display: 'inline-block',
          padding: '12px 20px',
          backgroundColor: '#4A56E2',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 500
        }}>
          Ver Video
        </a>
      </div>
    );
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header con gradiente */}
      <div style={{ 
        background: 'linear-gradient(135deg, #4A56E2 0%, #5463FF 100%)',
        padding: '30px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        {logoBase64 && (
          <div style={{ marginBottom: '15px' }}>
            <img src={logoBase64} alt="Logo" style={{ maxHeight: '60px', margin: '0 auto' }} />
          </div>
        )}
        <h1 style={{ 
          margin: '0 0 10px',
          fontSize: '28px',
          fontWeight: 700
        }}>
          {heading}
        </h1>
        <h2 style={{ 
          margin: '0',
          fontSize: '18px',
          fontWeight: 400,
          opacity: 0.9
        }}>
          {subheading}
        </h2>
      </div>
      
      {/* Contenido principal */}
      <div style={{ padding: '25px 30px' }}>
        {/* Sección de video */}
        {videoUrl && (
          <div style={{ 
            marginBottom: '25px',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            {renderVideoEmbed()}
          </div>
        )}
        
        {/* Imagen destacada si no hay video o como complemento */}
        {(!videoUrl || true) && imageUrl && (
          <div style={{ 
            marginBottom: '25px',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <img 
              src={imageUrl} 
              alt="Imagen destacada" 
              style={{ 
                width: '100%', 
                display: 'block',
                height: 'auto'
              }} 
            />
          </div>
        )}
        
        {/* Contenido de texto */}
        <div style={{ 
          color: '#333',
          lineHeight: '1.6',
          fontSize: '16px',
          marginBottom: '25px'
        }} dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}>
        </div>
        
        {/* Botón de llamada a la acción */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a 
            href={buttonUrl} 
            style={{
              display: 'inline-block',
              backgroundColor: '#4A56E2',
              color: 'white',
              padding: '12px 25px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '16px',
              transition: 'all 0.3s ease'
            }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{ 
        backgroundColor: '#f7f9fc', 
        padding: '20px', 
        textAlign: 'center',
        borderTop: '1px solid #eaeaea',
        color: '#666',
        fontSize: '14px'
      }}>
        <p style={{ margin: '0 0 10px' }}>© 2025 Programa de Cultura Digital - Todos los derechos reservados</p>
        <p style={{ margin: '0', fontSize: '12px' }}>
          Si no desea recibir más correos, <a href="#" style={{ color: '#4A56E2', textDecoration: 'none' }}>haga clic aquí</a> para darse de baja.
        </p>
      </div>
    </div>
  );
};

export default VideoTemplate;
