import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();

  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateForm = (): boolean => {
    setValidationError('');

    if (username.length < 3 || username.length > 30) {
      setValidationError('El nombre de usuario debe tener entre 3 y 30 caracteres');
      return false;
    }

    if (password.length < 7) {
      setValidationError('La contraseña debe tener al menos 7 caracteres');
      return false;
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLetter || !hasNumber) {
      setValidationError('La contraseña debe contener al menos una letra y un número');
      return false;
    }

    if (password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await register({ username, email, password });
    } catch (error) {
      // Error ya manejado en AuthContext
    }
  };

  const displayError = validationError || error;

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-12">
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-zinc-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-400">
            Regístrate en <span className="text-cyan-400 font-semibold">MOOB</span>
          </p>
        </div>

        {displayError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm">
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={30}
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-500"
              placeholder="usuario123"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">3-30 caracteres</p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-500"
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={7}
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-500"
              placeholder="Mínimo 7 caracteres"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Mínimo 7 caracteres, debe contener letras y números
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-500"
              placeholder="Repite tu contraseña"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !username || !email || !password || !confirmPassword}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? 'Cargando...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
