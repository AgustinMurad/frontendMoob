import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { messageService } from "../api/message.service";
import type { MessageStatsResponse } from "../types/message.types";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<
    MessageStatsResponse["data"]["statistics"] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await messageService.getStats();
        setStats(response.data.statistics);
      } catch (err: any) {
        console.error("Error al cargar estadísticas:", err);
        setError("No se pudieron obtener las estadísticas.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calcular tasa de éxito
  const successRate =
    stats && stats.total > 0
      ? ((stats.sent / stats.total) * 100).toFixed(1)
      : 0;

  // Calcular porcentajes por plataforma
  const platformPercentages =
    stats && stats.total > 0
      ? Object.entries(stats.byPlatform)
          .map(([platform, count]) => ({
            platform,
            count,
            percentage: ((count / stats.total) * 100).toFixed(1),
          }))
          .sort((a, b) => b.count - a.count)
      : [];

  return (
    <div className="min-h-screen bg-zinc-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Saludo principal */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">
            Hola, <span className="text-cyan-400">{user?.username}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Panel de control de{" "}
            <span className="text-cyan-400 font-medium">MOOB</span>
          </p>
        </div>

        {/* Enlaces de acciones */}
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

        {/* Sección de Estadísticas */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">
            Estadísticas de Mensajes
          </h2>

          {loading && (
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-md p-8 text-center">
              <div className="flex justify-center items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
                <p className="text-gray-400">Cargando estadísticas...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl shadow-md p-6">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {!loading && !error && stats && stats.total === 0 && (
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-md p-8">
              <p className="text-gray-400 text-center">
                Aún no hay estadísticas disponibles. ¡Envía tu primer mensaje!
              </p>
            </div>
          )}

          {!loading && !error && stats && stats.total > 0 && (
            <>
              {/* Cards principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Total de mensajes */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-md p-6">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Total de Mensajes
                  </h3>
                  <p className="text-4xl font-bold text-white">{stats.total}</p>
                </div>

                {/* Mensajes enviados */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-md p-6">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Mensajes Enviados
                  </h3>
                  <p className="text-4xl font-bold text-cyan-400">
                    {stats.sent}
                  </p>
                </div>

                {/* Mensajes fallidos */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-md p-6">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Mensajes Fallidos
                  </h3>
                  <p className="text-4xl font-bold text-red-400">
                    {stats.failed}
                  </p>
                </div>

                {/* Tasa de éxito */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-md p-6">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Tasa de Éxito
                  </h3>
                  <p className="text-4xl font-bold text-white">
                    {successRate}%
                  </p>
                </div>
              </div>

              {/* Distribución por plataforma */}
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">
                  Distribución por Plataforma
                </h3>

                {platformPercentages.length > 0 ? (
                  <ul className="space-y-4">
                    {platformPercentages.map(
                      ({ platform, count, percentage }) => (
                        <li key={platform}>
                          <div className="flex justify-between text-sm text-gray-300 mb-2">
                            <span className="capitalize font-medium">
                              {platform}
                            </span>
                            <span className="text-cyan-400 font-semibold">
                              {count} mensajes ({percentage}%)
                            </span>
                          </div>
                          <div className="bg-zinc-700 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    No hay datos de plataformas disponibles
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Información del sistema */}
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
