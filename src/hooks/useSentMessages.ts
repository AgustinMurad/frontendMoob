import { useState, useEffect } from "react";
import { messageService } from "../api/message.service";
import type {
  SentMessagesResponse,
  Message,
  PaginationMeta,
  CacheMeta,
} from "../types/message.types";

interface UseSentMessagesReturn {
  messages: Message[];
  pagination: PaginationMeta | null;
  cache: CacheMeta | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  nextPage: () => void;
  previousPage: () => void;
}

export const useSentMessages = (
  initialLimit: number = 10
): UseSentMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [cache, setCache] = useState<CacheMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(initialLimit);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: SentMessagesResponse =
        await messageService.getSentMessages(offset, limit);

      setMessages(response.data.messages);
      setPagination(response.data.pagination);
      setCache(response.data.cache);
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Error al cargar los mensajes";
      setError(Array.isArray(errorMsg) ? errorMsg.join(", ") : errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [offset, limit]);

  const nextPage = () => {
    if (pagination?.hasNextPage) {
      setOffset(offset + limit);
    }
  };

  const previousPage = () => {
    if (pagination?.hasPreviousPage) {
      setOffset(Math.max(0, offset - limit));
    }
  };

  const refetch = () => {
    fetchMessages();
  };

  return {
    messages,
    pagination,
    cache,
    isLoading,
    error,
    refetch,
    nextPage,
    previousPage,
  };
};
