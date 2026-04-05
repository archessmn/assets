import { Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export default async function PublicAssetPage({
  params,
}: {
  params: Promise<{ assetId: string }>;
}) {
  const awaitedParams = await params;

  const socials = [];

  while (true) {
    const social: string | undefined =
      process.env[`ASSETS_CONTACT_SOCIAL_${socials.length}`];
    if (social) {
      socials.push(social);
    } else {
      break;
    }
  }

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div style={{ display: "grid", placeItems: "center" }}>
        <Title>{awaitedParams.assetId}</Title>
        This asset belongs to <Title order={3}>Mia Moir</Title>
        Please contact them at one of the following:
        <Link
          style={{ textDecoration: "underline" }}
          href={`mailto:${process.env.ASSETS_CONTACT_EMAIL}`}
        >
          {process.env.ASSETS_CONTACT_EMAIL}
        </Link>
        <Link
          style={{ textDecoration: "underline" }}
          href={`tel:${process.env.ASSETS_CONTACT_PHONE}`}
        >
          {process.env.ASSETS_CONTACT_PHONE}
        </Link>
        {socials.map((s) => (
          <Link
            target="_blank"
            key={s}
            style={{ textDecoration: "underline" }}
            href={s}
          >
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
}
