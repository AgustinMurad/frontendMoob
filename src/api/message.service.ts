import api from "./axios";
import {
  SendMessageDto,
  SendMessageResponse,
  SentMessagesResponse,
  MessageStatsResponse,
} from "../types/message.types";

export const messageService = {
  // POST /messages/send (multipart/form-data)
  sendMessage: async (data: SendMessageDto): Promise<SendMessageResponse> => {
    const formData = new FormData();
    formData.append("platform", data.platform);
    formData.append("content", data.content);
    formData.append("recipients", JSON.stringify(data.recipients));

    if (data.file) {
      formData.append("file", data.file);
    }

    const response = await api.post<SendMessageResponse>(
      "/messages/send",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // GET /messages/sent?offset=0&limit=10
  getSentMessages: async (
    offset: number = 0,
    limit: number = 10
  ): Promise<SentMessagesResponse> => {
    const response = await api.get<SentMessagesResponse>("/messages/sent", {
      params: { offset, limit },
    });
    return response.data;
  },

  // GET /messages/stats
  getStats: async (): Promise<MessageStatsResponse> => {
    const response = await api.get<MessageStatsResponse>("/messages/stats");
    return response.data;
  },
};
