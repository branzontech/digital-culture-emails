
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TemplateProps {
  subject: string;
  heading: string;
  subheading: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  videoUrl?: string;
}

const MaintenanceTemplate: React.FC<TemplateProps> = ({
  heading = "Notificación de Mantenimiento Programado",
  subheading = "Información importante sobre el mantenimiento de sistemas",
  content = "Estimado usuario, queremos informarle que nuestros sistemas estarán en mantenimiento durante un período programado. Durante este tiempo, el acceso a ciertos servicios podría estar limitado o no disponible. Agradecemos su comprensión.",
  buttonText = "Más Información",
  buttonUrl = "#",
  imageUrl,
}) => {
  const formattedDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Ejemplo: mantenimiento en 3 días
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="font-poppins" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#f8f9fa', color: '#333' }}>
      {/* Header con gradiente y logo */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0052A5 0%, #0088cc 100%)',
        padding: '30px 20px',
        textAlign: 'center',
        borderRadius: '8px 8px 0 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', opacity: 0.1 }}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M44.3,-76.8C58,-69.6,70.2,-58.7,78.3,-45.1C86.4,-31.5,90.3,-15.7,87.6,-1.6C84.8,12.6,75.4,25.2,67.8,39C60.2,52.8,54.5,67.6,43.7,75.3C33,83,16.5,83.6,0.1,83.4C-16.2,83.3,-32.4,82.3,-45.2,75.2C-58,68.1,-67.3,55,-74.7,41C-82.1,27,-87.6,13.5,-86.8,0.5C-86,-12.6,-78.9,-25.3,-70.1,-35.9C-61.3,-46.6,-50.8,-55.2,-38.9,-63.4C-26.9,-71.6,-13.5,-79.2,1,-81C15.5,-82.9,30.9,-84,44.3,-76.8Z" transform="translate(100 100)" />
          </svg>
        </div>
        <img 
          src="https://cuidadoseguro.com.co/csc3/wp-content/uploads/2025/04/CULTURA-DIGITAL-CURVAS1.svg" 
          alt="Cultura Digital" 
          style={{ height: '60px', marginBottom: '20px', filter: 'brightness(0) invert(1)' }}
        />
        <h1 style={{ color: 'white', fontSize: '28px', margin: '0', fontWeight: '600' }}>{heading}</h1>
        <p style={{ color: 'white', fontSize: '16px', marginTop: '10px' }}>{subheading}</p>
      </div>
      
      {/* Contenido principal */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        {/* Icono de mantenimiento */}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div style={{ 
            display: 'inline-flex',
            backgroundColor: '#f2f9ff',
            borderRadius: '50%',
            padding: '20px',
            border: '2px solid #e1f0ff'
          }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#0052A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Detalles del mantenimiento */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          borderLeft: '4px solid #0052A5',
          padding: '15px',
          marginBottom: '25px',
          borderRadius: '0 8px 8px 0'
        }}>
          <h3 style={{ color: '#0052A5', margin: '0 0 10px 0', fontSize: '18px' }}>Detalles del Mantenimiento</h3>
          <p style={{ margin: '0', fontSize: '14px' }}><strong>Fecha:</strong> {formattedDate()}</p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Duración estimada:</strong> 2 horas</p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Sistemas afectados:</strong> Portal de usuarios, Plataforma de aprendizaje</p>
        </div>
        
        {/* Contenido principal */}
        <div style={{ margin: '0 0 25px 0', lineHeight: '1.6', color: '#444' }}>
          <p>{content}</p>
          <p>Durante el período de mantenimiento, nuestros equipos trabajarán para mejorar el rendimiento y la seguridad de nuestros sistemas, lo que resultará en una mejor experiencia para todos los usuarios.</p>
          <p>Si tiene alguna pregunta o inquietud, no dude en contactar a nuestro equipo de soporte.</p>
        </div>
        
        {/* Botón de acción */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a 
            href={buttonUrl}
            style={{
              backgroundColor: '#0052A5',
              color: 'white',
              padding: '12px 25px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'background-color 0.3s'
            }}
          >
            {buttonText}
          </a>
        </div>
        
        {/* Consejos */}
        <div style={{ 
          backgroundColor: '#fff8e6', 
          border: '1px solid #ffe0a6',
          borderRadius: '8px',
          padding: '15px',
          marginTop: '20px'
        }}>
          <h4 style={{ color: '#b78a2a', margin: '0 0 10px 0', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#b78a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12" stroke="#b78a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="#b78a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Consejos útiles
          </h4>
          <ul style={{ margin: '0', paddingLeft: '28px', fontSize: '14px' }}>
            <li>Guarde su trabajo antes del período de mantenimiento</li>
            <li>Programe sus actividades teniendo en cuenta este mantenimiento</li>
            <li>Póngase en contacto con soporte técnico si necesita asistencia urgente</li>
          </ul>
        </div>
      </div>
      
      {/* Footer con avatar */}
      <div style={{ 
        borderTop: '1px solid #eaeaea', 
        padding: '20px', 
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '0 0 8px 8px',
        color: '#666',
        fontSize: '14px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '15px'
        }}>
          <div style={{ marginRight: '15px' }}>
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5be01b5f8bd5be0001b1222c/0x0.png" alt="Soporte Técnico" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: '0', fontWeight: '600' }}>Equipo de Soporte Técnico</p>
            <p style={{ margin: '5px 0 0 0', fontSize: '13px' }}>Estamos aquí para ayudarte</p>
          </div>
        </div>
        <p style={{ margin: '15px 0 5px 0' }}>© 2025 Programa de Cultura Digital - Todos los derechos reservados</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '13px' }}>Por favor no responda a este correo electrónico</p>
      </div>
    </div>
  );
};

export default MaintenanceTemplate;
