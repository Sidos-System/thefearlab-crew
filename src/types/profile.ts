export type UserRole =
  | "Administrator"
  | "Veranstaltungsleitung"
  | "Security"
  | "Technik"
  | "Gastro"
  | "Schauspieler"
  | "Aufbau"
  | "Abbau"
  | "Crew";

export type UserStatus =
  | "Einsatzbereit"
  | "Pause"
  | "Beschäftigt"
  | "Urlaub"
  | "Krank"
  | "Offline";

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  phone: string | null;
  online: boolean;
  status: UserStatus;
  created_at: string;
}