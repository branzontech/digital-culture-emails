
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left section with image and gradient */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#0052A5] to-[#0088cc] p-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIj48L3JlY3Q+PC9zdmc+')] opacity-10"></div>
        <div className="relative z-10 text-white max-w-md mx-auto text-center">
          <img 
            src="https://cuidadoseguro.com.co/csc3/wp-content/uploads/2025/04/CULTURA-DIGITAL-CURVAS1.svg" 
            alt="Cultura Digital Logo" 
            className="mx-auto h-16 mb-8" 
          />
          <h2 className="text-3xl font-bold mb-4">Bienvenido al Programa de Cultura Digital</h2>
          <p className="text-lg opacity-90 mb-8">Accede a nuestra plataforma para gestionar tus plantillas de email y mucho más.</p>
          
          <div className="mt-12 flex justify-center">
            <img 
              src="https://branzontech.com/wp-content/uploads/2025/05/avatar_pose_1-removebg-preview.png" 
              alt="Decorative Avatar" 
              className="w-3/4 h-auto drop-shadow-2xl animation-float" 
            />
          </div>
        </div>
      </div>
      
      {/* Right section with login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center md:hidden mb-6">
              <img 
                src="https://cuidadoseguro.com.co/csc3/wp-content/uploads/2025/04/CULTURA-DIGITAL-CURVAS1.svg" 
                alt="Cultura Digital Logo" 
                className="h-12" 
              />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
            <p className="mt-2 text-sm text-gray-600">
              Accede a tu cuenta para gestionar tus plantillas de email
            </p>
          </div>
          
          <Card className="shadow-lg border-t-4 border-t-[#0052A5]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Autenticación</CardTitle>
              <CardDescription>
                Ingresa tus credenciales para acceder
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <a href="#" className="text-sm text-[#0066cc] hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#0052A5] to-[#0076cc] hover:from-[#004494] hover:to-[#0068b5]"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="relative my-4 w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path></svg>
                  &nbsp;Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                  &nbsp;GitHub
                </Button>
              </div>
              <p className="mt-6 text-center text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <a href="#" className="font-medium text-[#0052A5] hover:text-[#0076cc]">
                  Regístrate aquí
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
