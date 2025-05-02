
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, Users } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const location = useLocation();
  
  return (
    <div className={cn("w-full bg-gradient-to-r from-[#0052A5] to-[#0066CC] text-white shadow-md px-4 py-2", className)}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="https://cuidadoseguro.com.co/csc3/wp-content/uploads/2025/04/CULTURA-DIGITAL-CURVAS1.svg" 
            alt="Cultura Digital Logo" 
            className="h-10" 
          />
          <span className="text-lg font-bold hidden md:block">Programa de Cultura Digital</span>
        </div>
        
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-white/20 text-white",
                  location.pathname === '/' && "bg-white/20"
                )}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Inicio</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/notifications">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-white/20 text-white",
                  location.pathname === '/notifications' && "bg-white/20"
                )}>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notificaciones</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/contacts">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-white/20 text-white",
                  location.pathname === '/contacts' && "bg-white/20"
                )}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Contactos</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <Link to="/login" className="text-sm bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
