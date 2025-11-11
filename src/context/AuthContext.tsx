import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/auth.service';
import { LoginDto, RegisterDto, User } from '../types/auth.types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Al montar, verificar si hay token en localStorage
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        setToken(storedToken);
        try {
          // Verificar que el token sea válido obteniendo el perfil
          const profileData = await authService.getProfile();
          setUser(profileData.user);
          setIsAuthenticated(true);
        } catch (error) {
          // Token inválido o expirado
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (data: LoginDto) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(data);
      const accessToken = response.access_token;

      // Guardar token
      localStorage.setItem('token', accessToken);
      setToken(accessToken);

      // Obtener perfil del usuario
      const profileData = await authService.getProfile();
      setUser(profileData.user);
      setIsAuthenticated(true);

      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        'Error al iniciar sesión. Por favor, intenta de nuevo.';

      setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.register(data);
      const accessToken = response.access_token;

      // Guardar token
      localStorage.setItem('token', accessToken);
      setToken(accessToken);

      // Obtener perfil del usuario
      const profileData = await authService.getProfile();
      setUser(profileData.user);
      setIsAuthenticated(true);

      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        'Error al registrarse. Por favor, intenta de nuevo.';

      setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
