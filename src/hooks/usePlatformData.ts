"use client";

import {
  getChatChannels,
  getChatMessages,
  getDocuments,
  getEmergencies,
  getEmergencyLocations,
  getEvents,
  getInventoryItems,
  getProfiles,
  getTasks,
} from "@/services/platform";
import useRealtimeData from "@/hooks/useRealtimeData";

export function useProfiles() {
  return useRealtimeData(getProfiles, [], ["profiles", "roles"]);
}

export function useTasks() {
  return useRealtimeData(getTasks, [], ["tasks"]);
}

export function useDocuments() {
  return useRealtimeData(getDocuments, [], ["documents"]);
}

export function useInventoryItems() {
  return useRealtimeData(getInventoryItems, [], ["inventory"]);
}

export function useChatChannels() {
  return useRealtimeData(getChatChannels, [], ["chat_channels"]);
}

export function useChatMessages() {
  return useRealtimeData(getChatMessages, [], ["chat_messages"]);
}

export function useEvents() {
  return useRealtimeData(getEvents, [], ["events"]);
}

export function useEmergencyLocations() {
  return useRealtimeData(getEmergencyLocations, [], ["emergency_locations"]);
}

export function useEmergencies() {
  return useRealtimeData(getEmergencies, [], ["emergencies"]);
}
