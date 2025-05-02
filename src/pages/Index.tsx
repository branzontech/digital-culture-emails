
import EmailTemplateEditor from "@/components/EmailTemplateEditor";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <header className="bg-gradient-to-r from-[#0052A5] to-[#0066CC] text-white shadow-md">
        <div className="container mx-auto py-5 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://cuidadoseguro.com.co/csc3/wp-content/uploads/2025/04/CULTURA-DIGITAL-CURVAS1.svg" 
                alt="Cultura Digital Logo" 
                className="h-12" 
              />
              <div>
                <h1 className="text-xl font-bold">Editor de Plantillas</h1>
                <p className="text-sm opacity-80">Programa de Cultura Digital</p>
              </div>
            </div>
            <Link to="/login">
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/40">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <EmailTemplateEditor />
      </main>
      
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 Programa de Cultura Digital - Todos los derechos reservados</p>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
