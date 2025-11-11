import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold hover:text-blue-100 transition">
            MOOB App
          </Link>

          <div className="flex gap-4 items-center">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition">
                  Dashboard
                </Link>
                <Link to="/messages/send" className="hover:text-blue-200 transition">
                  Enviar
                </Link>
                <Link to="/messages/sent" className="hover:text-blue-200 transition">
                  Mensajes
                </Link>
                <div className="flex items-center gap-3">
                  {user && (
                    <span className="text-sm text-blue-100">
                      {user.username}
                    </span>
                  )}
                  <button
                    onClick={logout}
                    className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition"
                  >
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="hover:text-blue-200 transition">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
