import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 border-b border-zinc-700 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition">
            MOOB
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-100 hover:text-cyan-400 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-700">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                {user && (
                  <div className="px-4 py-2 text-sm text-cyan-400 font-medium border-b border-zinc-700">
                    {user.username}
                  </div>
                )}
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 transition font-medium ${
                    location.pathname === '/dashboard'
                      ? 'text-cyan-400 bg-zinc-800'
                      : 'text-gray-100 hover:text-cyan-400 hover:bg-zinc-800'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/messages/send"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 transition font-medium ${
                    location.pathname === '/messages/send'
                      ? 'text-cyan-400 bg-zinc-800'
                      : 'text-gray-100 hover:text-cyan-400 hover:bg-zinc-800'
                  }`}
                >
                  Enviar
                </Link>
                <Link
                  to="/messages/sent"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 transition font-medium ${
                    location.pathname === '/messages/sent'
                      ? 'text-cyan-400 bg-zinc-800'
                      : 'text-gray-100 hover:text-cyan-400 hover:bg-zinc-800'
                  }`}
                >
                  Mensajes
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  className="mx-4 mt-2 bg-zinc-800 hover:bg-zinc-700 text-gray-100 px-4 py-2 rounded-lg transition font-medium border border-zinc-600"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-gray-100 hover:text-cyan-400 hover:bg-zinc-800 transition font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="mx-4 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition font-semibold text-center"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
