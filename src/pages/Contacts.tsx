
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Check, X, Upload, Search, Filter, UserPlus, PenLine } from 'lucide-react';
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Datos de ejemplo para contactos
const mockContacts = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@ejemplo.com', status: 'active' },
  { id: 2, name: 'María López', email: 'maria.lopez@ejemplo.com', status: 'active' },
  { id: 3, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@ejemplo.com', status: 'inactive' },
  { id: 4, name: 'Ana García', email: 'ana.garcia@ejemplo.com', status: 'active' },
  { id: 5, name: 'Pedro Martínez', email: 'pedro.martinez@ejemplo.com', status: 'active' },
  { id: 6, name: 'Laura Sánchez', email: 'laura.sanchez@ejemplo.com', status: 'inactive' },
  { id: 7, name: 'Miguel Torres', email: 'miguel.torres@ejemplo.com', status: 'active' },
  { id: 8, name: 'Carmen Jiménez', email: 'carmen.jimenez@ejemplo.com', status: 'active' },
];

// Datos de ejemplo para listas
const mockLists = [
  { id: 1, name: 'Equipo de Desarrollo', contacts: [1, 2, 4] },
  { id: 2, name: 'Directivos', contacts: [3, 5] },
  { id: 3, name: 'Marketing', contacts: [2, 6] },
  { id: 4, name: 'Ventas', contacts: [1, 7, 8] },
  { id: 5, name: 'Soporte Técnico', contacts: [4, 5, 6] },
];

const Contacts = () => {
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newListName, setNewListName] = useState('');
  
  // Estados para búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(mockContacts);
  
  // Estados para diálogos
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showAddToListDialog, setShowAddToListDialog] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [importFile, setImportFile] = useState<File | null>(null);
  
  // Estados para edición de listas
  const [editingListId, setEditingListId] = useState<number | null>(null);
  const [editedListName, setEditedListName] = useState('');
  
  // Función para buscar contactos
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredContacts(mockContacts);
      return;
    }
    
    const filtered = mockContacts.filter(
      contact => contact.name.toLowerCase().includes(term.toLowerCase()) || 
                 contact.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleCreateContact = () => {
    // Aquí iría la lógica para crear el contacto
    console.log('Crear contacto:', { name: newContactName, email: newContactEmail });
    toast({
      title: "Contacto creado",
      description: `${newContactName} ha sido añadido a tus contactos.`,
    });
    setNewContactName('');
    setNewContactEmail('');
    setShowNewContactForm(false);
  };

  const handleCreateList = () => {
    // Aquí iría la lógica para crear la lista
    console.log('Crear lista:', { name: newListName });
    toast({
      title: "Lista creada",
      description: `La lista ${newListName} ha sido creada.`,
    });
    setNewListName('');
    setShowNewListForm(false);
  };

  const toggleContactStatus = (contactId: number) => {
    // En un entorno real, aquí actualizaríamos el estado en la base de datos
    console.log('Toggle estado del contacto:', contactId);
    toast({
      title: "Estado actualizado",
      description: "El estado del contacto ha sido actualizado.",
    });
  };
  
  const handleContactSelection = (contactId: number) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };
  
  const handleAddToList = () => {
    if (selectedList && selectedContacts.length > 0) {
      console.log('Agregar contactos a lista:', { listId: selectedList, contactIds: selectedContacts });
      toast({
        title: "Contactos agregados",
        description: `${selectedContacts.length} contacto(s) agregado(s) a la lista.`,
      });
      setSelectedContacts([]);
      setSelectedList(null);
      setShowAddToListDialog(false);
    }
  };
  
  const handleImportContacts = () => {
    if (!importFile) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo para importar",
        variant: "destructive",
      });
      return;
    }
    
    console.log('Importar contactos desde archivo:', importFile.name);
    toast({
      title: "Importación iniciada",
      description: "Los contactos están siendo importados. Esto puede tomar unos momentos.",
    });
    
    // Simular importación exitosa después de un tiempo
    setTimeout(() => {
      toast({
        title: "Importación completada",
        description: "Los contactos han sido importados exitosamente.",
      });
      setImportFile(null);
      setShowImportDialog(false);
    }, 2000);
  };
  
  // Nueva función para comenzar la edición de una lista
  const startEditingList = (list: { id: number; name: string }) => {
    setEditingListId(list.id);
    setEditedListName(list.name);
  };
  
  // Nueva función para guardar los cambios de una lista editada
  const saveEditedList = () => {
    if (editingListId && editedListName.trim()) {
      console.log('Guardar lista editada:', { id: editingListId, name: editedListName });
      toast({
        title: "Lista actualizada",
        description: `La lista ha sido renombrada a "${editedListName}".`,
      });
      setEditingListId(null);
      setEditedListName('');
    }
  };
  
  // Nueva función para cancelar la edición de una lista
  const cancelEditList = () => {
    setEditingListId(null);
    setEditedListName('');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />
      
      <main className="py-8 container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Contactos</h1>
            <p className="text-gray-600">Gestiona tus contactos y listas</p>
          </div>
          
          <Tabs defaultValue="contacts" className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="contacts">Contactos</TabsTrigger>
                <TabsTrigger value="lists">Listas</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="contacts" className="p-4">
              {/* Barra de búsqueda y acciones */}
              <div className="flex flex-col md:flex-row gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar contacto..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Importar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Importar contactos</DialogTitle>
                        <DialogDescription>
                          Sube un archivo CSV o Excel con tus contactos.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                          <Input 
                            type="file" 
                            accept=".csv,.xlsx,.xls" 
                            className="mx-auto"
                            onChange={(e) => setImportFile(e.target.files ? e.target.files[0] : null)}
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            Formatos soportados: CSV, Excel
                          </p>
                        </div>
                        <Button className="w-full" onClick={handleImportContacts}>
                          <Upload className="h-4 w-4 mr-2" />
                          Importar contactos
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={showAddToListDialog} onOpenChange={setShowAddToListDialog}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        disabled={selectedContacts.length === 0}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Agregar a lista
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar a lista</DialogTitle>
                        <DialogDescription>
                          Selecciona la lista a la que quieres agregar {selectedContacts.length} contacto(s).
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        {mockLists.map(list => (
                          <div 
                            key={list.id} 
                            className={`p-3 border rounded-md cursor-pointer ${selectedList === list.id ? 'bg-blue-50 border-blue-500' : ''}`}
                            onClick={() => setSelectedList(list.id)}
                          >
                            <div className="font-medium">{list.name}</div>
                            <div className="text-sm text-gray-500">{list.contacts.length} contactos</div>
                          </div>
                        ))}
                        <Button 
                          className="w-full" 
                          onClick={handleAddToList}
                          disabled={!selectedList}
                        >
                          Agregar a lista seleccionada
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="flex justify-center items-center"
                    onClick={() => setShowNewContactForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Agregar
                  </Button>
                </div>
              </div>
              
              {showNewContactForm && (
                <div className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Nuevo contacto</h4>
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Nombre"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="w-full"
                    />
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      value={newContactEmail}
                      onChange={(e) => setNewContactEmail(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowNewContactForm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        onClick={handleCreateContact}
                        disabled={!newContactName || !newContactEmail}
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <ScrollArea className="h-[500px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]">
                        <Input type="checkbox" className="w-4 h-4" onChange={() => {
                          if (selectedContacts.length === filteredContacts.length) {
                            setSelectedContacts([]);
                          } else {
                            setSelectedContacts(filteredContacts.map(c => c.id));
                          }
                        }} />
                      </TableHead>
                      <TableHead className="w-[250px]">Nombre</TableHead>
                      <TableHead>Correo electrónico</TableHead>
                      <TableHead className="text-right">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <Input 
                            type="checkbox" 
                            className="w-4 h-4" 
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => handleContactSelection(contact.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>{contact.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Label htmlFor={`contact-status-${contact.id}`} className={`text-sm ${contact.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                              {contact.status === 'active' ? 'Activo' : 'Inactivo'}
                            </Label>
                            <Switch 
                              id={`contact-status-${contact.id}`}
                              checked={contact.status === 'active'} 
                              onCheckedChange={() => toggleContactStatus(contact.id)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredContacts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                          No se encontraron contactos que coincidan con tu búsqueda
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="lists" className="p-4">
              {!showNewListForm ? (
                <Button 
                  className="w-full mb-4 flex justify-center items-center"
                  onClick={() => setShowNewListForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Crear lista
                </Button>
              ) : (
                <div className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Nueva lista</h4>
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Nombre de la lista"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowNewListForm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        onClick={handleCreateList}
                        disabled={!newListName}
                      >
                        Crear
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <ScrollArea className="h-[500px]">
                <div className="grid gap-3">
                  {mockLists.map((list) => (
                    <div 
                      key={list.id} 
                      className="p-4 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                    >
                      {editingListId === list.id ? (
                        <div className="space-y-3">
                          <Input
                            type="text"
                            value={editedListName}
                            onChange={(e) => setEditedListName(e.target.value)}
                            autoFocus
                            className="w-full"
                          />
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={cancelEditList}
                            >
                              <X className="h-4 w-4 mr-1" /> Cancelar
                            </Button>
                            <Button 
                              size="sm"
                              onClick={saveEditedList}
                              disabled={!editedListName.trim()}
                            >
                              <Check className="h-4 w-4 mr-1" /> Guardar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="font-medium">{list.name}</div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-gray-500 text-sm">
                              {list.contacts.length} contactos
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Ver</Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => startEditingList(list)}
                              >
                                <PenLine className="h-4 w-4 mr-1" /> Editar
                              </Button>
                              <Button variant="destructive" size="sm">Eliminar</Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 Programa de Cultura Digital - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Contacts;
