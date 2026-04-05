import { auth } from "@repo/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      {children}
    </div>
  );
}
