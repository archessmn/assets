import { auth } from "@repo/lib/auth";
import { db } from "@repo/lib/db";
import type { ExtendedError, Socket } from "socket.io";

export async function authenticateSocket(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void,
) {
  if (Object.hasOwn(socket.data, "auth")) {
    return next();
  }

  const session = await auth.api.getSession({
    headers: socket.client.request.headers,
  });

  if (session === null) return next();

  socket.join(`user:${session.user.id}`);
  socket.join("users");

  socket.data.session = session;

  return next();
}

export function parseCookie(
  cookie: string | undefined,
): Record<string, string> {
  if (cookie === undefined) return {};
  return cookie
    .split(";")
    .map((value) => value.split("="))
    .filter((v) => v[0] !== null && v[1] !== null)
    .reduce<Record<string, string>>((acc, v) => {
      const key = decodeURIComponent((v[0] ?? "").trim());
      const value = decodeURIComponent((v[1] ?? "").trim());
      acc[key] = value;
      return acc;
    }, {});
}

export function isServerSocket(socket: Socket) {
  return (
    socket.data.auth.authenticated === true &&
    socket.data.auth.isClient === false
  );
}
