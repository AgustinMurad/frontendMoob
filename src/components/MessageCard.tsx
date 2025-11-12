import type { Message } from '../types/message.types';
import PlatformBadge from './PlatformBadge';

interface MessageCardProps {
  message: Message;
}

const MessageCard = ({ message }: MessageCardProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content: string, maxLength: number = 100): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 hover:bg-zinc-800/80 hover:border-cyan-500/30 transition-all duration-200 shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <PlatformBadge platform={message.platform} />
          {message.sent ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-500 text-zinc-900">
              🟢 Enviado
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-500 text-zinc-900">
              🔴 Fallido
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
          {formatDate(message.createdAt)}
        </span>
      </div>

      <p className="text-gray-300 mb-4 leading-relaxed">{truncateContent(message.content)}</p>

      <div className="flex items-center justify-between text-sm border-t border-zinc-700 pt-4">
        <div className="flex items-center gap-2 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="font-medium text-gray-300">
            {message.recipients.length} destinatario{message.recipients.length !== 1 ? 's' : ''}
          </span>
        </div>

        {message.fileUrl && (
          <a
            href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            Ver archivo
          </a>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
