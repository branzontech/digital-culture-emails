
import React from 'react';

interface MaintenanceImageProps {
  imageUrl: string;
}

const MaintenanceImage: React.FC<MaintenanceImageProps> = ({ imageUrl }) => {
  return (
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
  );
};

export default MaintenanceImage;
