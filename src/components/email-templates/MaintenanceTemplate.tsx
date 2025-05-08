
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
  maintenanceDate?: string;
  maintenanceDuration?: string;
  affectedSystems?: string;
  recommendations?: string[];
}

const MaintenanceTemplate: React.FC<TemplateProps> = ({
  heading = "Notificación de Mantenimiento Programado",
  subheading = "Información importante sobre el mantenimiento de sistemas",
  content = "Estimado usuario, queremos informarle que nuestros sistemas estarán en mantenimiento durante un período programado. Durante este tiempo, el acceso a ciertos servicios podría estar limitado o no disponible. Agradecemos su comprensión.",
  buttonText = "Más Información",
  buttonUrl = "#",
  imageUrl,
  maintenanceDate,
  maintenanceDuration = "2 horas",
  affectedSystems = "Portal de usuarios, Plataforma de aprendizaje, Base de datos principal",
  recommendations = [
    "Guarde y finalice su trabajo antes del inicio del mantenimiento programado",
    "Descargue cualquier informe o documento importante que pueda necesitar durante el período de inactividad",
    "Notifique a su equipo sobre esta ventana de mantenimiento para planificar adecuadamente",
    "Si requiere asistencia urgente durante el mantenimiento, contacte a soporte técnico por los canales alternativos"
  ]
}) => {
  const formattedDate = () => {
    if (maintenanceDate) return maintenanceDate;
    
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
    <div className="font-poppins" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fcfcfd', color: '#333' }}>
      {/* Header con gradiente moderno */}
      <div style={{ 
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
        padding: '35px 25px',
        textAlign: 'center',
        borderRadius: '16px 16px 0 0',
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
          style={{ height: '70px', marginBottom: '25px', filter: 'brightness(0) invert(1)' }}
        />
        <h1 style={{ color: 'white', fontSize: '32px', margin: '0', fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{heading}</h1>
        <p style={{ color: 'white', fontSize: '18px', marginTop: '12px', opacity: '0.9' }}>{subheading}</p>
      </div>
      
      {/* Contenido principal con diseño mejorado */}
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '0 0 16px 16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        {/* Imagen de mantenimiento (ahora circular y más pequeña) */}
        <div style={{ textAlign: 'center', margin: '0 0 30px 0' }}>
          <div style={{ 
            width: '180px', 
            height: '180px', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            margin: '0 auto',
            border: '4px solid #f0f6ff',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)'
          }}>
            <img 
              src={imageUrl || "https://branzontech.com/wp-content/uploads/2025/05/ChatGPT-Image-8-may-2025-15_45_23-min.png"}
              alt="Mantenimiento programado"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        
        {/* Detalles del mantenimiento con nuevo diseño */}
        <div style={{ 
          backgroundColor: '#f0f6ff', 
          borderLeft: '5px solid #6366f1',
          padding: '20px',
          marginBottom: '30px',
          borderRadius: '0 12px 12px 0',
          boxShadow: '0 4px 6px rgba(99, 102, 241, 0.1)'
        }}>
          <h3 style={{ color: '#4f46e5', margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600' }}>Detalles del Mantenimiento</h3>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ minWidth: '24px', marginRight: '10px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ margin: '0', fontSize: '15px' }}><strong>Fecha:</strong> {formattedDate()}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ minWidth: '24px', marginRight: '10px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ margin: '0', fontSize: '15px' }}><strong>Duración estimada:</strong> {maintenanceDuration}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div style={{ minWidth: '24px', marginRight: '10px', marginTop: '3px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0002 2L3 10H10.0002V22H14.0002V10H21.0002L14.0002 2H10.0002Z" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ margin: '0', fontSize: '15px' }}><strong>Sistemas afectados:</strong> {affectedSystems}</p>
          </div>
        </div>
        
        {/* Contenido principal mejorado */}
        <div style={{ margin: '0 0 30px 0', lineHeight: '1.7', color: '#374151', fontSize: '15px' }}>
          <p style={{ marginBottom: '15px' }}>{content}</p>
          <p style={{ marginBottom: '15px' }}>Durante este período de mantenimiento programado, nuestros equipos técnicos implementarán mejoras críticas para optimizar el rendimiento y la seguridad de nuestras plataformas. Estas actualizaciones son necesarias para garantizar una experiencia más fluida y segura para todos nuestros usuarios.</p>
          <p style={{ marginBottom: '0' }}>Recomendamos planificar sus actividades teniendo en cuenta esta ventana de mantenimiento. Si tiene alguna pregunta o inquietud, nuestro equipo de soporte estará disponible para asistirle.</p>
        </div>
        
        {/* Botón de acción */}
        <div style={{ textAlign: 'center', margin: '35px 0' }}>
          <a 
            href={buttonUrl}
            style={{
              backgroundColor: '#6366f1',
              color: 'white',
              padding: '14px 30px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
          >
            {buttonText}
          </a>
        </div>
        
        {/* Consejos con nuevo diseño */}
        <div style={{ 
          backgroundColor: '#fef3c7', 
          border: '1px solid #fcd34d',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(252, 211, 77, 0.1)'
        }}>
          <h4 style={{ color: '#92400e', margin: '0 0 15px 0', fontSize: '18px', display: 'flex', alignItems: 'center', fontWeight: '600' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Recomendaciones importantes
          </h4>
          <ul style={{ margin: '0', paddingLeft: '34px', fontSize: '15px', color: '#78350f' }}>
            {recommendations.map((recommendation, index) => (
              <li key={index} style={{ marginBottom: index < recommendations.length - 1 ? '8px' : 0 }}>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Footer con avatar mejorado */}
      <div style={{ 
        borderTop: '1px solid #e5e7eb', 
        padding: '30px 20px', 
        backgroundColor: '#f9fafb',
        borderRadius: '0 0 16px 16px',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '14px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.03)'
        }}>
          <div style={{ marginRight: '20px' }}>
            <Avatar className="h-20 w-20 border-2 border-purple-100">
              <AvatarImage src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5be01b5f8bd5be0001b1222c/0x0.png" alt="Soporte Técnico" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: '0 0 5px 0', fontWeight: '700', fontSize: '16px', color: '#4b5563' }}>Equipo de Soporte Técnico</p>
            <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Estamos aquí para ayudarte</p>
            <p style={{ margin: '0', fontSize: '14px' }}>soporte@culturadigital.com</p>
          </div>
        </div>
        <p style={{ margin: '20px 0 10px 0', fontWeight: '500' }}>© 2025 Programa de Cultura Digital - Todos los derechos reservados</p>
        <p style={{ margin: '0 0 0 0', fontSize: '13px', opacity: '0.8' }}>Este es un mensaje automático, por favor no responda a este correo electrónico</p>
      </div>
    </div>
  );
};

export default MaintenanceTemplate;
