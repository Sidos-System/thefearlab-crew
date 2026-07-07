"use client";

import { FormEvent, useState } from "react";
import {
  Download,
  FileText,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import PermissionGate from "@/components/auth/PermissionGate";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Dialog from "@/components/ui/Dialog";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Skeleton from "@/components/ui/Skeleton";
import { useDocuments } from "@/hooks/usePlatformData";
import usePermissions from "@/hooks/usePermissions";
import { formatDate } from "@/lib/format";
import {
  deleteDocument,
  uploadDocument,
} from "@/services/platform";

export default function DocumentsPage() {
  const {
    data: documents,
    loading,
    refresh,
  } = useDocuments();
  const { can } = usePermissions();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submitUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Bitte wähle eine Datei aus.");
      return;
    }

    setSaving(true);
    setError("");

    const result = await uploadDocument({
      file,
      title,
      category,
    });

    setSaving(false);

    if (!result.ok) {
      setError(result.error ?? "Dokument konnte nicht hochgeladen werden.");
      return;
    }

    setDialogOpen(false);
    setTitle("");
    setCategory("");
    setFile(null);
    refresh();
  }

  async function removeDocument(id: string, storagePath: string | null) {
    await deleteDocument(id, storagePath);
    refresh();
  }

  return (
    <AppShell
      title="Dokumente"
      subtitle="Dateien, Freigaben und Versionen"
    >
      <PermissionGate
        fallback={(
          <EmptyState
            text="Dein Account besitzt keine Berechtigung für Dokumente."
            title="Kein Zugriff"
          />
        )}
        permission="documents.read"
      >
        <div className="space-y-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Input
            className="w-full xl:w-[460px]"
            icon={<Search size={18} />}
            placeholder="Dokument suchen..."
            type="search"
          />
          {can("documents.upload") && (
            <Button onClick={() => setDialogOpen(true)}>
              <Upload size={18} />
              Upload
            </Button>
          )}
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
                    {document.fileUrl && (
                      <Button
                        aria-label={`${document.title} herunterladen`}
                        onClick={() => window.open(document.fileUrl ?? "", "_blank", "noopener,noreferrer")}
                        size="icon"
                        variant="secondary"
                      >
                        <Download size={17} />
                      </Button>
                    )}
                    {can("documents.delete") && (
                      <Button
                        aria-label={`${document.title} löschen`}
                        onClick={() => removeDocument(document.id, document.storagePath)}
                        size="icon"
                        variant="secondary"
                      >
                        <Trash2 size={17} />
                      </Button>
                    )}
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

        <Dialog
          description="Datei in Supabase Storage hochladen und in der Dokumentbibliothek speichern."
          onClose={() => setDialogOpen(false)}
          open={dialogOpen}
          title="Dokument hochladen"
        >
          <form
            className="space-y-4"
            onSubmit={submitUpload}
          >
            <Input
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Titel"
              required
              value={title}
            />
            <Input
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Kategorie"
              value={category}
            />
            <input
              className="block w-full rounded-[18px] border border-border-soft bg-surface-1 px-4 py-3 text-sm text-text-secondary file:mr-4 file:rounded-[14px] file:border-0 file:bg-surface-raised file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              required
              type="file"
            />

            {error && (
              <div className="rounded-[18px] border border-accent/25 bg-accent/10 p-4 text-sm text-red-100">
                {error}
              </div>
            )}

            <Button
              disabled={saving}
              type="submit"
            >
              <Upload size={18} />
              {saving ? "Lade hoch..." : "Hochladen"}
            </Button>
          </form>
        </Dialog>
        </div>
      </PermissionGate>
    </AppShell>
  );
}
