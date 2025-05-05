
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, Send, Loader2, ExternalLink, Calendar as CalendarIcon } from "lucide-react";
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
import ThirteenTemplate from "./email-templates/ThirteenTemplate";
import FourteenTemplate from "./email-templates/FourteenTemplate";
import FifteenTemplate from "./email-templates/FifteenTemplate";
import { sendEmail, parseEmailList } from "@/utils/emailService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-mobile";

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
  
  // Scheduling state
  const [isScheduling, setIsScheduling] = useState<boolean>(false);
  const [scheduleType, setScheduleType] = useState<"now" | "hours" | "days">("now");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date());
  const [scheduledTime, setScheduledTime] = useState<string>("12:00");
  const [scheduledHours, setScheduledHours] = useState<number>(1);
  const [scheduledDays, setScheduledDays] = useState<number>(1);
  
  // Dialog/drawer state
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
      case "template13": return <ThirteenTemplate {...templateProps} />;
      case "template14": return <FourteenTemplate {...templateProps} />;
      case "template15": return <FifteenTemplate {...templateProps} />;
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

  const getScheduledSendTime = (): Date => {
    const now = new Date();
    
    if (scheduleType === "now") {
      return now;
    } else if (scheduleType === "hours") {
      const futureTime = new Date(now.getTime() + scheduledHours * 60 * 60 * 1000);
      return futureTime;
    } else if (scheduleType === "days") {
      // If we have a specific date selected
      if (scheduledDate) {
        const [hours, minutes] = scheduledTime.split(':').map(Number);
        const scheduledDateTime = new Date(scheduledDate);
        scheduledDateTime.setHours(hours, minutes, 0, 0);
        return scheduledDateTime;
      } else {
        // Fallback to X days from now at the specified time
        const [hours, minutes] = scheduledTime.split(':').map(Number);
        const futureDate = new Date(now.getTime() + scheduledDays * 24 * 60 * 60 * 1000);
        futureDate.setHours(hours, minutes, 0, 0);
        return futureDate;
      }
    }
    
    return now;
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
      
      // Get the scheduled time
      const scheduledTime = getScheduledSendTime();
      const isScheduledForLater = scheduleType !== "now";
      
      // Format the scheduled time for display
      const formattedScheduledTime = format(scheduledTime, "PPpp", { locale: es });

      // For now we're simulating scheduling - in a real implementation,
      // you would store this in a database and use a cron job or similar
      const result = await sendEmail({
        to: sendMode === "individual" ? recipients[0] : recipients,
        subject: templateContent.subject,
        htmlContent: "", // We'll generate this in the service
        templateId: selectedTemplate,
        templateProps: {
          subject: templateContent.subject,
          heading: templateContent.heading,
          subheading: templateContent.subheading,
          content: templateContent.content,
          buttonText: templateContent.buttonText,
          buttonUrl: templateContent.buttonUrl,
          imageUrl: getCurrentImage(),
        },
        // Add scheduling information
        scheduledFor: isScheduledForLater ? scheduledTime.toISOString() : undefined
      });

      if (result.success) {
        toast({
          title: isScheduledForLater ? "¡Programado!" : "¡Éxito!",
          description: isScheduledForLater 
            ? `El correo ha sido programado para: ${formattedScheduledTime}`
            : result.message,
        });
        
        if (result.previewUrl) {
          setPreviewUrl(result.previewUrl);
        }
        
        // Close the scheduling dialog if open
        setIsScheduleDialogOpen(false);
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

  // Scheduling popup component based on device
  const SchedulingPopup = () => {
    const content = (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tipo de programación</label>
          <Select
            value={scheduleType}
            onValueChange={(value: "now" | "hours" | "days") => setScheduleType(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione cuándo enviar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="now">Enviar ahora</SelectItem>
              <SelectItem value="hours">En X horas</SelectItem>
              <SelectItem value="days">En fecha específica</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {scheduleType === "hours" && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Horas desde ahora</label>
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                min="1" 
                max="72"
                value={scheduledHours}
                onChange={(e) => setScheduledHours(parseInt(e.target.value) || 1)}
              />
              <span>hora(s)</span>
            </div>
            <p className="text-xs text-gray-500">
              Se enviará aproximadamente a las {format(
                new Date(Date.now() + scheduledHours * 60 * 60 * 1000),
                "HH:mm, dd 'de' MMMM", 
                { locale: es }
              )}
            </p>
          </div>
        )}
        
        {scheduleType === "days" && (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Seleccione fecha</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal w-full"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? (
                      format(scheduledDate, "PPP", { locale: es })
                    ) : (
                      <span>Seleccione una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Hora</label>
              <Input 
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    );

    if (isMobile) {
      return (
        <Drawer open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(true)}>
              <CalendarIcon className="h-4 w-4 mr-2" />
              Programar
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Programar envío de correo</DrawerTitle>
              <DrawerDescription>Configure cuándo desea enviar el correo</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2">
              {content}
            </div>
            <DrawerFooter>
              <Button onClick={handleSendEmail} disabled={isSending} className="w-full">
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduleType === "now" ? "Enviar ahora" : "Programar envío"}
                  </>
                )}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsScheduleDialogOpen(true)}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Programar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Programar envío de correo</DialogTitle>
            <DialogDescription>Configure cuándo desea enviar el correo</DialogDescription>
          </DialogHeader>
          {content}
          <DialogFooter>
            <Button onClick={handleSendEmail} disabled={isSending} className="w-full">
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduleType === "now" ? "Enviar ahora" : "Programar envío"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
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
                <Button
                  variant={selectedTemplate === "template13" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template13")}
                >
                  <span className="text-xs">Moderna</span>
                </Button>
                <Button
                  variant={selectedTemplate === "template14" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template14")}
                >
                  <span className="text-xs">Profesional</span>
                </Button>
                <Button
                  variant={selectedTemplate === "template15" ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col"
                  onClick={() => setSelectedTemplate("template15")}
                >
                  <span className="text-xs">Minimalista</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Vista Previa</h3>
              <div className="flex space-x-2">
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
                      Enviar
                    </>
                  )}
                </Button>
                <SchedulingPopup />
              </div>
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
