import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">
            Hola, <span className="text-cyan-400">{user?.username}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Panel de control de{" "}
            <span className="text-cyan-400 font-medium">MOOB</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/messages/send"
            className="bg-zinc-800 border border-zinc-700 hover:border-cyan-500/50 rounded-xl shadow-lg p-8 transition-all duration-200 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-cyan-500/10 p-4 rounded-lg group-hover:bg-cyan-500/20 transition">
                <svg
                  className="w-8 h-8 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-100">
                Enviar Mensaje
              </h2>
            </div>
            <p className="text-gray-400">
              Envía mensajes a través de múltiples plataformas con archivos
              adjuntos
            </p>
          </Link>

          <Link
            to="/messages/sent"
            className="bg-zinc-800 border border-zinc-700 hover:border-cyan-500/50 rounded-xl shadow-lg p-8 transition-all duration-200 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-cyan-500/10 p-4 rounded-lg group-hover:bg-cyan-500/20 transition">
                <svg
                  className="w-8 h-8 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-100">
                Mensajes Enviados
              </h2>
            </div>
            <p className="text-gray-400">
              Consulta el historial de todos tus mensajes enviados con
              paginación
            </p>
          </Link>
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            Información del sistema
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
              <p className="text-gray-400 mb-1">Usuario</p>
              <p className="text-gray-100 font-medium">{user?.email}</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
              <p className="text-gray-400 mb-1">Plataformas</p>
              <p className="text-gray-100 font-medium">4 disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
