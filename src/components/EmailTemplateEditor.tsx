
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, Send, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TemplateOne from "./email-templates/TemplateOne";
import TemplateTwo from "./email-templates/TemplateTwo";
import TemplateThree from "./email-templates/TemplateThree";
import TemplateFour from "./email-templates/TemplateFour";
import TemplateFive from "./email-templates/TemplateFive";
import TemplateSix from "./email-templates/TemplateSix";
import TemplateSeven from "./email-templates/TemplateSeven";
import TemplateEight from "./email-templates/TemplateEight";
import TemplateNine from "./email-templates/TemplateNine";
import { sendEmail, parseEmailList } from "@/utils/emailService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const EmailTemplateEditor = () => {
  const { toast } = useToast();
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
  const [emailTo, setEmailTo] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendMode, setSendMode] = useState<"individual" | "bulk">("individual");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const getTemplateComponent = () => {
    const templateProps = {
      subject: templateContent.subject,
      heading: templateContent.heading,
      subheading: templateContent.subheading,
      content: templateContent.content,
      buttonText: templateContent.buttonText,
      buttonUrl: templateContent.buttonUrl,
      imageUrl: getCurrentImage(),
    };

    switch (selectedTemplate) {
      case "template1": return <TemplateOne {...templateProps} />;
      case "template2": return <TemplateTwo {...templateProps} />;
      case "template3": return <TemplateThree {...templateProps} />;
      case "template4": return <TemplateFour {...templateProps} />;
      case "template5": return <TemplateFive {...templateProps} />;
      case "template6": return <TemplateSix {...templateProps} />;
      case "template7": return <TemplateSeven {...templateProps} />;
      case "template8": return <TemplateEight {...templateProps} />;
      case "template9": return <TemplateNine {...templateProps} />;
      default: return <TemplateOne {...templateProps} />;
    }
  };

  const getHtmlContent = (): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${templateContent.subject}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #0052A5, #0066CC); color: white; padding: 20px; }
          .content { padding: 20px; background: white; }
          .button { display: inline-block; padding: 10px 15px; background: #0052A5; color: white; text-decoration: none; border-radius: 4px; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${templateContent.heading}</h1>
            <h2>${templateContent.subheading}</h2>
          </div>
          <div class="content">
            <img src="${getCurrentImage()}" alt="Email Image">
            <div>${templateContent.content.replace(/\n/g, '<br>')}</div>
            <p><a href="${templateContent.buttonUrl}" class="button">${templateContent.buttonText}</a></p>
          </div>
          <div class="footer" style="text-align: center; padding: 20px; background: #f5f5f5;">
            <p>© 2025 Programa de Cultura Digital - Todos los derechos reservados</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleSendEmail = async () => {
    if (!templateContent.subject) {
      toast({
        title: "Error",
        description: "Por favor, ingrese un asunto para el correo.",
        variant: "destructive",
      });
      return;
    }
    
    if (!emailTo) {
      toast({
        title: "Error",
        description: "Por favor, ingrese al menos un destinatario.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    setPreviewUrl(null);
    
    try {
      const recipients = parseEmailList(emailTo);
      
      if (recipients.length === 0) {
        toast({
          title: "Error",
          description: "No se encontraron direcciones de correo válidas.",
          variant: "destructive",
        });
        setIsSending(false);
        return;
      }

      const result = await sendEmail({
        to: sendMode === "individual" ? recipients[0] : recipients,
        subject: templateContent.subject,
        htmlContent: getHtmlContent(),
        from: { email: "soporteit@cuidadoseguro.com.co", name: "Programa Cultura Digital" }
      });

      if (result.success) {
        toast({
          title: "¡Éxito!",
          description: result.message,
        });
        
        if (result.previewUrl) {
          setPreviewUrl(result.previewUrl);
        }
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al enviar el correo.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Contenido</TabsTrigger>
                  <TabsTrigger value="image">Imagen</TabsTrigger>
                  <TabsTrigger value="send">Enviar</TabsTrigger>
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
                <TabsContent value="send" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Envío de Correo</h3>
                    
                    {previewUrl && (
                      <Alert className="mb-4 bg-blue-50 border-blue-200">
                        <AlertTitle className="text-blue-700">Correo enviado correctamente</AlertTitle>
                        <AlertDescription className="text-blue-600">
                          <p className="mb-2">El correo ha sido enviado a través de nuestro servicio de prueba (Ethereal).</p>
                          <a 
                            href={previewUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-700 hover:text-blue-900 font-semibold"
                          >
                            Ver cómo se ve el correo <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="flex space-x-2 mb-4">
                      <Button
                        variant={sendMode === "individual" ? "default" : "outline"}
                        onClick={() => setSendMode("individual")}
                        className="flex-1"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Individual
                      </Button>
                      <Button
                        variant={sendMode === "bulk" ? "default" : "outline"}
                        onClick={() => setSendMode("bulk")}
                        className="flex-1"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Masivo
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="emailTo" className="text-sm font-medium">
                        {sendMode === "individual" ? "Destinatario" : "Destinatarios (separados por coma, punto y coma o nueva línea)"}
                      </label>
                      <Textarea
                        id="emailTo"
                        placeholder={sendMode === "individual" ? "correo@ejemplo.com" : "correo1@ejemplo.com, correo2@ejemplo.com"}
                        rows={sendMode === "individual" ? 1 : 4}
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      onClick={handleSendEmail}
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar {sendMode === "bulk" ? "Correos" : "Correo"}
                        </>
                      )}
                    </Button>
                  </div>
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
                <Button
                  variant={selectedTemplate === "template4" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template4")}
                >
                  <span className="text-xs">Talleres</span>
                </Button>
                <Button
                  variant={selectedTemplate === "template5" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template5")}
                >
                  <span className="text-xs">Tendencias</span>
                </Button>
                <Button
                  variant={selectedTemplate === "template6" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template6")}
                >
                  <span className="text-xs">Políticas</span>
                </Button>
                {/* New template buttons */}
                <Button
                  variant={selectedTemplate === "template7" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template7")}
                >
                  <span className="text-xs">Transformación</span>
                </Button>
                <Button
                  variant={selectedTemplate === "template8" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template8")}
                >
                  <span className="text-xs">Eventos</span>
                </Button>
                <Button
                  variant={selectedTemplate === "template9" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template9")}
                >
                  <span className="text-xs">Innovación</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Vista Previa</h3>
              <Button 
                onClick={handleSendEmail}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar {sendMode === "bulk" ? "Correos" : "Correo"}
                  </>
                )}
              </Button>
            </div>
            <div className="p-4 overflow-auto max-h-[700px]">
              {getTemplateComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
