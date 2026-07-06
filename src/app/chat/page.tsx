"use client";

import { useMemo, useState } from "react";
import { Hash, MessageCircle, Paperclip, Send } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";
import { useChatChannels, useChatMessages } from "@/hooks/usePlatformData";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const {
    data: channels,
    loading: channelsLoading,
  } = useChatChannels();
  const {
    data: messages,
    loading: messagesLoading,
  } = useChatMessages();
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);

  const effectiveChannelId = selectedChannelId ?? channels[0]?.id ?? null;
  const selectedChannel = channels.find((channel) => channel.id === effectiveChannelId);
  const visibleMessages = useMemo(() => (
    effectiveChannelId
      ? messages.filter((message) => message.channelId === effectiveChannelId)
      : messages
  ), [messages, effectiveChannelId]);

  return (
    <AppShell
      title="Chat"
      subtitle="Kanäle, Direktnachrichten und Dateien"
    >
      <div className="grid min-h-[680px] gap-6 xl:grid-cols-[280px_1fr]">
        <Card
          className="space-y-3"
          padding="sm"
        >
          <p className="px-2 text-xs font-bold uppercase text-text-muted">
            Channels
          </p>

          {channelsLoading ? (
            <>
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </>
          ) : channels.length > 0 ? (
            channels.map((channel) => (
              <button
                className={cn(
                  "flex h-12 w-full items-center gap-3 rounded-[18px] px-4 text-sm font-semibold transition duration-200",
                  effectiveChannelId === channel.id
                    ? "bg-white text-background"
                    : "text-text-secondary hover:bg-surface-3 hover:text-white",
                )}
                key={channel.id}
                onClick={() => setSelectedChannelId(channel.id)}
                type="button"
              >
                <Hash size={17} />
                {channel.name}
              </button>
            ))
          ) : (
            <EmptyState
              text="In Supabase sind noch keine Chatkanäle vorhanden."
              title="Keine Kanäle"
            />
          )}
        </Card>

        <Card
          className="flex min-h-[680px] flex-col"
          padding="none"
        >
          <div className="flex items-center justify-between border-b border-border-soft p-5">
            <div>
              <div className="flex items-center gap-2">
                <Hash size={18} />
                <h2 className="font-black">
                  {selectedChannel?.name ?? "Kein Kanal"}
                </h2>
              </div>
              <p className="mt-1 text-sm text-text-muted">
                {visibleMessages.length} Nachrichten
              </p>
            </div>
            <Badge variant="accent">
              <MessageCircle size={14} />
              Live
            </Badge>
          </div>

          <div className="flex-1 space-y-4 p-5">
            {messagesLoading ? (
              <>
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </>
            ) : visibleMessages.length > 0 ? (
              visibleMessages.map((message) => (
                <div className="flex gap-3" key={message.id}>
                  <Avatar name={message.authorName} size="sm" status="online" />
                  <div className="rounded-[20px] bg-surface-1 p-4">
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{message.authorName}</p>
                      <span className="text-xs text-text-muted">
                        {formatTime(message.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">
                      {message.body}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                text="Für diesen Kanal sind noch keine Nachrichten vorhanden."
                title="Keine Nachrichten"
              />
            )}
          </div>

          <div className="border-t border-border-soft p-5">
            <div className="flex gap-3">
              <Button
                aria-label="Datei anhängen"
                disabled={!selectedChannel}
                size="icon"
                variant="secondary"
              >
                <Paperclip size={18} />
              </Button>
              <Input
                className="flex-1"
                disabled={!selectedChannel}
                placeholder="Nachricht schreiben..."
              />
              <Button
                aria-label="Nachricht senden"
                disabled={!selectedChannel}
                size="icon"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
