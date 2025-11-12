import type { Platform } from '../types/message.types';

interface PlatformBadgeProps {
  platform: Platform;
}

const PlatformBadge = ({ platform }: PlatformBadgeProps) => {
  const platformConfig: Record<Platform, { color: string; label: string }> = {
    telegram: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Telegram' },
    slack: { color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', label: 'Slack' },
    discord: { color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30', label: 'Discord' },
    whatsapp: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'WhatsApp' },
  };

  const config = platformConfig[platform];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${config.color}`}
    >
      {config.label}
    </span>
  );
};

export default PlatformBadge;
