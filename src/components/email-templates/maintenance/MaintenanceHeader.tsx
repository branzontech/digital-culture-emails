
import React from 'react';

interface MaintenanceHeaderProps {
  heading: string;
  subheading: string;
}

const MaintenanceHeader: React.FC<MaintenanceHeaderProps> = ({ heading, subheading }) => {
  return (
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
  );
};

export default MaintenanceHeader;
