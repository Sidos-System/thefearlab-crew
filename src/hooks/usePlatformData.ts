"use client";

import {
  getChatChannels,
  getChatMessages,
  getDocuments,
  getEvents,
  getInventoryItems,
  getProfiles,
  getTasks,
} from "@/services/platform";
import useAsyncData from "@/hooks/useAsyncData";

export function useProfiles() {
  return useAsyncData(getProfiles, [], 15000);
}

export function useTasks() {
  return useAsyncData(getTasks, [], 15000);
}

export function useDocuments() {
  return useAsyncData(getDocuments, [], 30000);
}

export function useInventoryItems() {
  return useAsyncData(getInventoryItems, [], 30000);
}

export function useChatChannels() {
  return useAsyncData(getChatChannels, [], 10000);
}

export function useChatMessages() {
  return useAsyncData(getChatMessages, [], 5000);
}

export function useEvents() {
  return useAsyncData(getEvents, [], 30000);
}
