
import EmailTemplateEditor from "@/components/EmailTemplateEditor";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-[#0052A5] to-[#0066CC] text-white shadow-md">
        <div className="container mx-auto py-5 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/0e574739-35fa-4928-81a5-e46995dd9ded.png" 
                alt="Cultura Digital Logo" 
                className="h-12" 
              />
              <div>
                <h1 className="text-xl font-bold">Editor de Plantillas</h1>
                <p className="text-sm opacity-80">Programa de Cultura Digital</p>
              </div>
            </div>
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
    </div>
  );
};

export default Index;
