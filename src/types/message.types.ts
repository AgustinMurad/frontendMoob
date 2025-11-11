// Tipos para mensajes basados en el Swagger JSON

export type Platform = 'telegram' | 'slack' | 'discord' | 'whatsapp';

export interface SendMessageDto {
  platform: Platform;
  content: string;
  recipients: string[];
  file?: File;
}

export interface Message {
  id: string;
  platform: Platform;
  recipients: string[];
  content: string;
  fileUrl: string | null;
  sent: boolean;
  createdAt: string;
}

export interface MessageWithSender extends Message {
  sentBy: {
    id: string;
    username: string;
  };
}

export interface PaginationMeta {
  total: number;
  count: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CacheMeta {
  hit: boolean;
  ttl: string;
  source: string;
}

export interface SentMessagesResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      username: string;
    };
    messages: Message[];
    pagination: PaginationMeta;
    cache: CacheMeta;
  };
}

export interface MessageStatsResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      username: string;
    };
    statistics: {
      total: number;
      sent: number;
      failed: number;
      byPlatform: Record<Platform, number>;
    };
  };
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: MessageWithSender;
}
