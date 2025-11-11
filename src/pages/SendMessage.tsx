import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { messageService } from "../api/message.service";
import type { Platform } from "../types/message.types";

const SendMessage = () => {
  const navigate = useNavigate();

  // Estados del formulario
  const [platform, setPlatform] = useState<Platform>("telegram");
  const [content, setContent] = useState("");
  const [recipientsInput, setRecipientsInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Estados de UI
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const platforms: { value: Platform; label: string }[] = [
    { value: "telegram", label: "Telegram" },
    { value: "slack", label: "Slack" },
    { value: "discord", label: "Discord" },
    { value: "whatsapp", label: "WhatsApp" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validar tamaño (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMessage("El archivo no puede superar los 10MB");
        return;
      }

      setFile(selectedFile);

      // Crear preview para imágenes
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const parseRecipients = (input: string): string[] => {
    // Separar por comas, espacios o saltos de línea
    return input
      .split(/[,\n\s]+/)
      .map((r) => r.trim())
      .filter((r) => r.length > 0);
  };

  const validateForm = (): boolean => {
    setErrorMessage("");

    if (!platform) {
      setErrorMessage("Selecciona una plataforma");
      return false;
    }

    if (!content.trim()) {
      setErrorMessage("El contenido del mensaje es requerido");
      return false;
    }

    if (content.length > 5000) {
      setErrorMessage("El contenido no puede superar los 5000 caracteres");
      return false;
    }

    const recipients = parseRecipients(recipientsInput);
    if (recipients.length === 0) {
      setErrorMessage("Debes agregar al menos un destinatario");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const recipients = parseRecipients(recipientsInput);

      await messageService.sendMessage({
        platform,
        content,
        recipients,
        file: file || undefined,
      });

      setSuccessMessage("¡Mensaje enviado exitosamente!");

      // Limpiar formulario
      setPlatform("telegram");
      setContent("");
      setRecipientsInput("");
      setFile(null);
      setFilePreview(null);

      // Redirigir a mensajes enviados después de 2 segundos
      setTimeout(() => {
        navigate("/messages/sent");
      }, 2000);
    } catch (error: unknown) {
      let errorMsg = "Error al enviar el mensaje";

      if (typeof error === "string") {
        errorMsg = error;
      } else if (typeof error === "object" && error !== null) {
        const maybeErr = error as {
          response?: { data?: { message?: string | string[] } };
        };
        const msg = maybeErr.response?.data?.message;
        if (typeof msg === "string") {
          errorMsg = msg;
        } else if (Array.isArray(msg)) {
          errorMsg = msg.join(", ");
        }
      }

      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Enviar Mensaje
          </h1>

          {/* Mensajes de éxito/error */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plataforma */}
            <div>
              <label
                htmlFor="platform"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Plataforma *
              </label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
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
                className="block text-sm font-medium text-gray-700 mb-2"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
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
                className="block text-sm font-medium text-gray-700 mb-2"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {content.length} / 5000 caracteres
              </p>
            </div>

            {/* Archivo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo adjunto (opcional)
              </label>

              {!file ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    disabled={isLoading}
                    accept="image/*,application/pdf,video/*,.doc,.docx,.xls,.xlsx"
                    className="hidden"
                  />
                  <label
                    htmlFor="file"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 mb-2"
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
                    <span className="text-sm text-gray-600">
                      Haz clic para seleccionar un archivo
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Máximo 10MB
                    </span>
                  </label>
                </div>
              ) : (
                <div className="border border-gray-300 rounded-lg p-4">
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
                        className="w-16 h-16 text-gray-400"
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
                    <p className="text-sm font-medium text-gray-700">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={removeFile}
                      disabled={isLoading}
                      className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Eliminar archivo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition disabled:opacity-50"
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
