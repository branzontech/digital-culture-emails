
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Check, X } from 'lucide-react';
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

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
              {!showNewContactForm ? (
                <Button 
                  className="w-full mb-4 flex justify-center items-center"
                  onClick={() => setShowNewContactForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Agregar contacto
                </Button>
              ) : (
                <div className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Nuevo contacto</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={newContactEmail}
                      onChange={(e) => setNewContactEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
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
              
              <ScrollArea className="h-[500px]">
                <div className="grid gap-3">
                  {mockContacts.map((contact) => (
                    <div 
                      key={contact.id} 
                      className="p-4 bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-gray-500 text-sm">{contact.email}</div>
                      </div>
                      <button
                        onClick={() => toggleContactStatus(contact.id)}
                        className={`p-2 rounded-full ${
                          contact.status === 'active' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}
                        title={contact.status === 'active' ? 'Desactivar' : 'Activar'}
                      >
                        {contact.status === 'active' ? <Check size={18} /> : <X size={18} />}
                      </button>
                    </div>
                  ))}
                </div>
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
                    <input
                      type="text"
                      placeholder="Nombre de la lista"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
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
                      <div className="font-medium">{list.name}</div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-gray-500 text-sm">
                          {list.contacts.length} contactos
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Editar</Button>
                          <Button variant="destructive" size="sm">Eliminar</Button>
                        </div>
                      </div>
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
      
      <Toaster />
    </div>
  );
};

export default Contacts;
