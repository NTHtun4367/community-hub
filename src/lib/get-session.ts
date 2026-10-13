"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

const isDynamicRenderSignal = (
  value: unknown,
  visited = new Set<object>(),
): boolean => {
  if (typeof value === "string") return value.includes("Dynamic server usage");
  if (!value || typeof value !== "object" || visited.has(value)) return false;

  visited.add(value);
  const details = value as { digest?: unknown };
  if (details.digest === "DYNAMIC_SERVER_USAGE") return true;

  return Object.values(value).some((nested) =>
    isDynamicRenderSignal(nested, visited),
  );
};

export const getSession = async () => {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    // A session is optional on public pages. If the database is temporarily
    // unreachable, render those pages as signed out instead of crashing the app.
    if (!isDynamicRenderSignal(error)) {
      console.error("Unable to read the current session", error);
    }
    return null;
  }

};
