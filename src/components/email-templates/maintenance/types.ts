
export interface MaintenanceTemplateProps {
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
