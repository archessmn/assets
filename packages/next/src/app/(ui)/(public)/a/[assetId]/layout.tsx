import { AppLayout } from "@/app/_components/app-shell";
import { auth } from "@repo/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ assetId: string }>;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect(`/asset/${(await params).assetId}`);
  }

  return children;
}
