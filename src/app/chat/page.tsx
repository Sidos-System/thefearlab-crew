"use client";

import { FormEvent, useMemo, useState } from "react";
import { Hash, MessageCircle, Send } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import PermissionGate from "@/components/auth/PermissionGate";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";
import { useChatChannels, useChatMessages } from "@/hooks/usePlatformData";
import usePermissions from "@/hooks/usePermissions";
import useProfile from "@/hooks/useProfile";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { sendChatMessage } from "@/services/platform";

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
  const [messageBody, setMessageBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const { profile } = useProfile();
  const { can } = usePermissions();

  const effectiveChannelId = selectedChannelId ?? channels[0]?.id ?? null;
  const selectedChannel = channels.find((channel) => channel.id === effectiveChannelId);
  const visibleMessages = useMemo(() => (
    effectiveChannelId
      ? messages.filter((message) => message.channelId === effectiveChannelId)
      : messages
  ), [messages, effectiveChannelId]);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!effectiveChannelId || !messageBody.trim()) {
      return;
    }

    setSending(true);
    setError("");

    const result = await sendChatMessage({
      channelId: effectiveChannelId,
      body: messageBody.trim(),
      authorName: profile?.full_name ?? "Crew",
    });

    setSending(false);

    if (!result.ok) {
      setError(result.error ?? "Nachricht konnte nicht gesendet werden.");
      return;
    }

    setMessageBody("");
  }

  return (
    <AppShell
      title="Chat"
      subtitle="Kanäle, Direktnachrichten und Dateien"
    >
      <PermissionGate
        fallback={(
          <EmptyState
            text="Dein Account besitzt keine Berechtigung für den Chat."
            title="Kein Zugriff"
          />
        )}
        permission="chat.read"
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
            {error && (
              <div className="mb-4 rounded-[18px] border border-accent/25 bg-accent/10 p-4 text-sm text-red-100">
                {error}
              </div>
            )}
            {selectedChannel && can("chat.write") && (
              <form
                className="flex gap-3"
                onSubmit={submitMessage}
              >
                <Input
                  className="flex-1"
                  onChange={(event) => setMessageBody(event.target.value)}
                  placeholder="Nachricht schreiben..."
                  value={messageBody}
                />
                <Button
                  aria-label="Nachricht senden"
                  disabled={sending}
                  size="icon"
                  type="submit"
                >
                  <Send size={18} />
                </Button>
              </form>
            )}
          </div>
        </Card>
        </div>
      </PermissionGate>
    </AppShell>
  );
}
