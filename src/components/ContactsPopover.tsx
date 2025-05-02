
import React, { useState } from 'react';
import { Users, Plus, Check, X } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContactsPopoverProps {
  onOpenChange: (open: boolean) => void;
  isActive: boolean;
}

// Datos de ejemplo para contactos
const mockContacts = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@ejemplo.com', status: 'active' },
  { id: 2, name: 'María López', email: 'maria.lopez@ejemplo.com', status: 'active' },
  { id: 3, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@ejemplo.com', status: 'inactive' },
  { id: 4, name: 'Ana García', email: 'ana.garcia@ejemplo.com', status: 'active' },
  { id: 5, name: 'Pedro Martínez', email: 'pedro.martinez@ejemplo.com', status: 'active' },
  { id: 6, name: 'Laura Sánchez', email: 'laura.sanchez@ejemplo.com', status: 'inactive' },
];

// Datos de ejemplo para listas
const mockLists = [
  { id: 1, name: 'Equipo de Desarrollo', contacts: [1, 2, 4] },
  { id: 2, name: 'Directivos', contacts: [3, 5] },
  { id: 3, name: 'Marketing', contacts: [2, 6] },
];

const ContactsPopover = ({ onOpenChange, isActive }: ContactsPopoverProps) => {
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newListName, setNewListName] = useState('');

  const handleCreateContact = () => {
    // Aquí iría la lógica para crear el contacto
    console.log('Crear contacto:', { name: newContactName, email: newContactEmail });
    setNewContactName('');
    setNewContactEmail('');
    setShowNewContactForm(false);
  };

  const handleCreateList = () => {
    // Aquí iría la lógica para crear la lista
    console.log('Crear lista:', { name: newListName });
    setNewListName('');
    setShowNewListForm(false);
  };

  const toggleContactStatus = (contactId: number) => {
    // Aquí iría la lógica para activar/desactivar el contacto
    console.log('Toggle estado del contacto:', contactId);
  };

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-white/20 text-white",
            isActive && "bg-white/20"
          )}
        >
          <Users className="mr-2 h-4 w-4" />
          <span>Contactos</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] p-0 bg-white shadow-lg rounded-md border border-gray-200" align="center">
        <div className="bg-gray-50 p-3 border-b border-gray-200">
          <h3 className="font-semibold text-lg">Contactos</h3>
          <p className="text-sm text-gray-500">Gestiona tus contactos y listas</p>
        </div>
        
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="contacts">Contactos</TabsTrigger>
            <TabsTrigger value="lists">Listas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="p-0">
            <div className="p-2">
              {!showNewContactForm ? (
                <Button 
                  variant="outline" 
                  className="w-full mb-3 flex justify-center items-center"
                  onClick={() => setShowNewContactForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Agregar contacto
                </Button>
              ) : (
                <div className="border border-gray-200 rounded-md p-3 mb-3">
                  <h4 className="font-medium text-sm mb-2">Nuevo contacto</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={newContactEmail}
                      onChange={(e) => setNewContactEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowNewContactForm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleCreateContact}
                        disabled={!newContactName || !newContactEmail}
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <ScrollArea className="h-[300px]">
                {mockContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="mb-2 p-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-sm">{contact.name}</div>
                      <div className="text-gray-500 text-xs">{contact.email}</div>
                    </div>
                    <button
                      onClick={() => toggleContactStatus(contact.id)}
                      className={`p-1 rounded-full ${
                        contact.status === 'active' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                      title={contact.status === 'active' ? 'Desactivar' : 'Activar'}
                    >
                      {contact.status === 'active' ? <Check size={16} /> : <X size={16} />}
                    </button>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="lists" className="p-0">
            <div className="p-2">
              {!showNewListForm ? (
                <Button 
                  variant="outline" 
                  className="w-full mb-3 flex justify-center items-center"
                  onClick={() => setShowNewListForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Crear lista
                </Button>
              ) : (
                <div className="border border-gray-200 rounded-md p-3 mb-3">
                  <h4 className="font-medium text-sm mb-2">Nueva lista</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Nombre de la lista"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowNewListForm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleCreateList}
                        disabled={!newListName}
                      >
                        Crear
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <ScrollArea className="h-[300px]">
                {mockLists.map((list) => (
                  <div 
                    key={list.id} 
                    className="mb-2 p-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <div className="font-medium text-sm">{list.name}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {list.contacts.length} contactos
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default ContactsPopover;
