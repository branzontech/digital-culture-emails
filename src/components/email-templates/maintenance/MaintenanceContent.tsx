
import React from 'react';

interface MaintenanceContentProps {
  content: string;
}

const MaintenanceContent: React.FC<MaintenanceContentProps> = ({ content }) => {
  return (
    <div style={{ margin: '0 0 30px 0', lineHeight: '1.7', color: '#374151', fontSize: '15px' }}>
      <p style={{ marginBottom: '15px' }}>{content}</p>
      <p style={{ marginBottom: '15px' }}>Durante este período de mantenimiento programado, nuestros equipos técnicos implementarán mejoras críticas para optimizar el rendimiento y la seguridad de nuestras plataformas. Estas actualizaciones son necesarias para garantizar una experiencia más fluida y segura para todos nuestros usuarios.</p>
      <p style={{ marginBottom: '0' }}>Recomendamos planificar sus actividades teniendo en cuenta esta ventana de mantenimiento. Si tiene alguna pregunta o inquietud, nuestro equipo de soporte estará disponible para asistirle.</p>
    </div>
  );
};

export default MaintenanceContent;
