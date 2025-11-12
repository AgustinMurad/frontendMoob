import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { messageService } from "../api/message.service";
import type { Platform } from "../types/message.types";

export interface UseSendMessageReturn {
  // Estados del formulario
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  content: string;
  setContent: (content: string) => void;
  recipientsInput: string;
  setRecipientsInput: (recipients: string) => void;
  file: File | null;
  filePreview: string | null;

  // Estados de UI
  isLoading: boolean;
  successMessage: string;
  errorMessage: string;

  // Funciones
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;

  // Constantes
  platforms: { value: Platform; label: string }[];
}

export const useSendMessage = (): UseSendMessageReturn => {
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

  return {
    // Estados del formulario
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

    // Funciones
    handleFileChange,
    removeFile,
    handleSubmit,

    // Constantes
    platforms,
  };
};
