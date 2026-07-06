"use client";

import {
  Download,
  FileCheck2,
  FileText,
  Search,
  Upload,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Skeleton from "@/components/ui/Skeleton";
import { useDocuments } from "@/hooks/usePlatformData";
import { formatDate } from "@/lib/format";

export default function DocumentsPage() {
  const {
    data: documents,
    loading,
  } = useDocuments();

  return (
    <AppShell
      title="Dokumente"
      subtitle="Dateien, Freigaben und Versionen"
    >
      <div className="space-y-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Input
            className="w-full xl:w-[460px]"
            icon={<Search size={18} />}
            placeholder="Dokument suchen..."
            type="search"
          />
          <Button disabled>
            <Upload size={18} />
            Upload
          </Button>
        </div>

        <Section
          subtitle="Schneller Zugriff auf freigegebene Event-Dokumente."
          title="Bibliothek"
        >
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          ) : documents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {documents.map((document) => (
                <Card
                  className="flex h-full flex-col justify-between"
                  key={document.id}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="rounded-[18px] bg-surface-raised p-3 text-text-secondary">
                        <FileText size={22} />
                      </div>
                      {document.version && (
                        <Badge variant="accent">{document.version}</Badge>
                      )}
                    </div>

                    <h2 className="mt-6 text-xl font-black">
                      {document.title}
                    </h2>
                    <p className="mt-2 text-sm text-text-muted">
                      {document.category ?? "Ohne Kategorie"} · aktualisiert{" "}
                      {formatDate(document.updatedAt)}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button
                      className="flex-1"
                      disabled={!document.fileUrl}
                      variant="secondary"
                    >
                      <FileCheck2 size={17} />
                      Preview
                    </Button>
                    <Button
                      aria-label={`${document.title} herunterladen`}
                      disabled={!document.fileUrl}
                      size="icon"
                      variant="secondary"
                    >
                      <Download size={17} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              text="In Supabase sind noch keine Dokumente vorhanden."
              title="Keine Dokumente"
            />
          )}
        </Section>
      </div>
    </AppShell>
  );
}
