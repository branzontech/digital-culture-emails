
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TemplateOne from "./email-templates/TemplateOne";
import TemplateTwo from "./email-templates/TemplateTwo";
import TemplateThree from "./email-templates/TemplateThree";

const EmailTemplateEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("template1");
  const [templateContent, setTemplateContent] = useState({
    subject: "",
    heading: "",
    subheading: "",
    content: "",
    buttonText: "Leer más",
    buttonUrl: "#",
    imageUrl: "",
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setTemplateContent({
      ...templateContent,
      [field]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentImage = () => {
    if (uploadedImage) return uploadedImage;
    if (templateContent.imageUrl) return templateContent.imageUrl;
    return "https://via.placeholder.com/600x300";
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Editor de Plantilla</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Contenido</TabsTrigger>
                  <TabsTrigger value="image">Imagen</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Asunto del Correo
                    </label>
                    <Input
                      id="subject"
                      placeholder="Asunto del correo"
                      value={templateContent.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="heading" className="text-sm font-medium">
                      Título Principal
                    </label>
                    <Input
                      id="heading"
                      placeholder="Título principal"
                      value={templateContent.heading}
                      onChange={(e) => handleInputChange("heading", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subheading" className="text-sm font-medium">
                      Subtítulo
                    </label>
                    <Input
                      id="subheading"
                      placeholder="Subtítulo"
                      value={templateContent.subheading}
                      onChange={(e) => handleInputChange("subheading", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">
                      Contenido
                    </label>
                    <Textarea
                      id="content"
                      placeholder="Contenido del correo"
                      rows={5}
                      value={templateContent.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="buttonText" className="text-sm font-medium">
                      Texto del Botón
                    </label>
                    <Input
                      id="buttonText"
                      placeholder="Texto del botón"
                      value={templateContent.buttonText}
                      onChange={(e) => handleInputChange("buttonText", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="buttonUrl" className="text-sm font-medium">
                      URL del Botón
                    </label>
                    <Input
                      id="buttonUrl"
                      placeholder="URL del botón"
                      value={templateContent.buttonUrl}
                      onChange={(e) => handleInputChange("buttonUrl", e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="image" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="imageUrl" className="text-sm font-medium">
                      URL de la Imagen
                    </label>
                    <Input
                      id="imageUrl"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={templateContent.imageUrl}
                      onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">O Subir Imagen</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  {(uploadedImage || templateContent.imageUrl) && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Vista previa de la imagen:</p>
                      <img
                        src={getCurrentImage()}
                        alt="Vista previa"
                        className="max-w-full h-auto rounded-md border"
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Seleccionar Plantilla</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={selectedTemplate === "template1" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template1")}
                >
                  <span className="text-xs">Tips</span>
                </Button>
                <Button
                  variant={selectedTemplate === "template2" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template2")}
                >
                  <span className="text-xs">Ciber Seguridad</span>
                </Button>
                <Button
                  variant={selectedTemplate === "template3" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template3")}
                >
                  <span className="text-xs">Anuncios</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Vista Previa</h3>
            </div>
            <div className="p-4 overflow-auto max-h-[700px]">
              {selectedTemplate === "template1" && (
                <TemplateOne
                  subject={templateContent.subject}
                  heading={templateContent.heading}
                  subheading={templateContent.subheading}
                  content={templateContent.content}
                  buttonText={templateContent.buttonText}
                  buttonUrl={templateContent.buttonUrl}
                  imageUrl={getCurrentImage()}
                />
              )}
              {selectedTemplate === "template2" && (
                <TemplateTwo
                  subject={templateContent.subject}
                  heading={templateContent.heading}
                  subheading={templateContent.subheading}
                  content={templateContent.content}
                  buttonText={templateContent.buttonText}
                  buttonUrl={templateContent.buttonUrl}
                  imageUrl={getCurrentImage()}
                />
              )}
              {selectedTemplate === "template3" && (
                <TemplateThree
                  subject={templateContent.subject}
                  heading={templateContent.heading}
                  subheading={templateContent.subheading}
                  content={templateContent.content}
                  buttonText={templateContent.buttonText}
                  buttonUrl={templateContent.buttonUrl}
                  imageUrl={getCurrentImage()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
