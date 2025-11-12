import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-zinc-900 border-b border-zinc-700 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition">
            MOOB
          </Link>

          <div className="flex gap-6 items-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`transition font-medium pb-1 border-b-2 ${
                    location.pathname === '/dashboard'
                      ? 'text-cyan-400 border-cyan-400'
                      : 'text-gray-100 hover:text-cyan-400 border-transparent'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/messages/send"
                  className={`transition font-medium pb-1 border-b-2 ${
                    location.pathname === '/messages/send'
                      ? 'text-cyan-400 border-cyan-400'
                      : 'text-gray-100 hover:text-cyan-400 border-transparent'
                  }`}
                >
                  Enviar
                </Link>
                <Link
                  to="/messages/sent"
                  className={`transition font-medium pb-1 border-b-2 ${
                    location.pathname === '/messages/sent'
                      ? 'text-cyan-400 border-cyan-400'
                      : 'text-gray-100 hover:text-cyan-400 border-transparent'
                  }`}
                >
                  Mensajes
                </Link>
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-zinc-700">
                  {user && (
                    <span className="text-sm text-cyan-400 font-medium">
                      {user.username}
                    </span>
                  )}
                  <button
                    onClick={logout}
                    className="bg-zinc-800 hover:bg-zinc-700 text-gray-100 px-4 py-2 rounded-lg transition font-medium border border-zinc-600"
                  >
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-100 hover:text-cyan-400 transition font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition font-semibold"
                >
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
