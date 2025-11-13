import { useNavigate } from "react-router-dom";
import { useSendMessage } from "../hooks/useSendMessage";
import type { Platform } from "../types/message.types";
import { MAX_FILE_SIZE_MB } from "../config/uploadConfig";

const SendMessage = () => {
  const navigate = useNavigate();
  const {
    // Estados formulario
    platform,
    content,
    recipientsInput,
    file,
    filePreview,
    setPlatform,
    setContent,
    setRecipientsInput,

    // Estados UI
    isLoading,
    successMessage,
    errorMessage,

    // Fn
    handleFileChange,
    removeFile,
    handleSubmit,

    // Const
    platforms,
  } = useSendMessage();

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Enviar Mensaje
          </h1>
          <p className="text-gray-400 mb-8">
            Envía mensajes a través de múltiples plataformas con{" "}
            <span className="text-cyan-400 font-semibold">MOOB</span>
          </p>

          {/* Mensajes de éxito/error */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 text-green-400 rounded-lg">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plataforma */}
            <div>
              <label
                htmlFor="platform"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Plataforma *
              </label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:bg-zinc-800"
              >
                {platforms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Destinatarios */}
            <div>
              <label
                htmlFor="recipients"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Destinatarios *
              </label>
              <input
                type="text"
                id="recipients"
                value={recipientsInput}
                onChange={(e) => setRecipientsInput(e.target.value)}
                placeholder="Ej: 123456789, 987654321 (separados por comas)"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-500 disabled:bg-zinc-800"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ingresa los IDs separados por comas. Para Telegram usa chat_id,
                para Slack usa user_id o channel_id
              </p>
            </div>

            {/* Contenido */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Contenido del mensaje *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                required
                rows={6}
                maxLength={5000}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-500 disabled:bg-zinc-800 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {content.length} / 5000 caracteres
              </p>
            </div>

            {/* Archivo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Archivo adjunto (opcional)
              </label>

              {!file ? (
                <div className="border-2 border-dashed border-zinc-600 rounded-lg p-6 text-center hover:border-cyan-400 transition bg-zinc-900/50">
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    disabled={isLoading}
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    className="hidden"
                  />
                  <label
                    htmlFor="file"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      className="w-12 h-12 text-cyan-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm text-gray-300">
                      Haz clic para seleccionar un archivo
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Máximo {MAX_FILE_SIZE_MB} MB
                    </span>
                  </label>
                </div>
              ) : (
                <div className="border border-zinc-600 rounded-lg p-4 bg-zinc-900/50">
                  {filePreview ? (
                    <div className="mb-3">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center mb-3">
                      <svg
                        className="w-16 h-16 text-cyan-400"
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
                  )}
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-300">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={removeFile}
                      disabled={isLoading}
                      className="mt-2 text-sm text-red-400 hover:text-red-300 font-medium"
                    >
                      Eliminar archivo
                    </button>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tamaño máximo permitido: <strong>{MAX_FILE_SIZE_MB} MB</strong> — Formatos: <strong>JPG, PNG, WEBP, PDF</strong></span>
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar Mensaje"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/messages/sent")}
                disabled={isLoading}
                className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-gray-100 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
