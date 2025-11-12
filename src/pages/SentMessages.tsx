import { useNavigate } from "react-router-dom";
import { useSentMessages } from "../hooks/useSentMessages";
import MessageCard from "../components/MessageCard";

const SentMessages = () => {
  const navigate = useNavigate();
  const {
    messages,
    pagination,
    cache,
    isLoading,
    error,
    nextPage,
    previousPage,
    refetch,
  } = useSentMessages(10);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando mensajes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-100 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Mensajes Enviados
              </h1>
              <p className="text-gray-600 mt-1">
                Historial de mensajes enviados a través de la plataforma
              </p>
            </div>
            <button
              onClick={() => navigate("/messages/send")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nuevo Mensaje
            </button>
          </div>

          {/* Stats y Cache Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            {pagination && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="w-5 h-5"
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
                <span className="font-medium">{pagination.total}</span> mensajes
                totales
              </div>
            )}

            {cache && (
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  cache.hit
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
                {cache.hit ? "Cache Redis" : "Base de datos"}
              </span>
            )}

            <button
              onClick={refetch}
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Actualizar
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && messages.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No se encontraron mensajes
            </h3>
            <p className="text-gray-500 mb-6">
              Aún no has enviado ningún mensaje. Comienza enviando tu primer
              mensaje.
            </p>
            <button
              onClick={() => navigate("/messages/send")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Enviar Primer Mensaje
            </button>
          </div>
        )}

        {/* Messages List */}
        {messages.length > 0 && (
          <>
            <div className="grid gap-4 mb-6">
              {messages.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={previousPage}
                    disabled={!pagination.hasPreviousPage}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Anterior
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Página{" "}
                      <span className="font-medium">
                        {pagination.currentPage}
                      </span>{" "}
                      de{" "}
                      <span className="font-medium">
                        {pagination.totalPages}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Mostrando {pagination.count} de {pagination.total}{" "}
                      mensajes
                    </p>
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={!pagination.hasNextPage}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Siguiente
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SentMessages;
