import type { Platform } from "../types/message.types";

interface PlatformBadgeProps {
  platform: Platform;
}

const PlatformBadge = ({ platform }: PlatformBadgeProps) => {
  const platformConfig: Record<Platform, { color: string; label: string }> = {
    telegram: { color: "bg-blue-100 text-blue-800", label: "Telegram" },
    slack: { color: "bg-purple-100 text-purple-800", label: "Slack" },
    discord: { color: "bg-indigo-100 text-indigo-800", label: "Discord" },
    whatsapp: { color: "bg-green-100 text-green-800", label: "WhatsApp" },
  };

  const config = platformConfig[platform];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
};

export default PlatformBadge;
