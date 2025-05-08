
import React from 'react';
import MaintenanceHeader from './maintenance/MaintenanceHeader';
import MaintenanceImage from './maintenance/MaintenanceImage';
import MaintenanceDetails from './maintenance/MaintenanceDetails';
import MaintenanceContent from './maintenance/MaintenanceContent';
import MaintenanceButton from './maintenance/MaintenanceButton';
import MaintenanceRecommendations from './maintenance/MaintenanceRecommendations';
import MaintenanceFooter from './maintenance/MaintenanceFooter';
import { MaintenanceTemplateProps } from './maintenance/types';

const MaintenanceTemplate: React.FC<MaintenanceTemplateProps> = ({
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
      <MaintenanceHeader heading={heading} subheading={subheading} />
      
      {/* Contenido principal con diseño mejorado */}
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '0 0 16px 16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        {/* Imagen de mantenimiento circular */}
        <MaintenanceImage imageUrl={imageUrl} />
        
        {/* Detalles del mantenimiento */}
        <MaintenanceDetails 
          maintenanceDuration={maintenanceDuration}
          affectedSystems={affectedSystems}
          formattedDate={formattedDate}
        />
        
        {/* Contenido principal */}
        <MaintenanceContent content={content} />
        
        {/* Botón de acción */}
        <MaintenanceButton buttonText={buttonText} buttonUrl={buttonUrl} />
        
        {/* Consejos con nuevo diseño */}
        <MaintenanceRecommendations recommendations={recommendations} />
      </div>
      
      {/* Footer con avatar */}
      <MaintenanceFooter />
    </div>
  );
};

export default MaintenanceTemplate;
