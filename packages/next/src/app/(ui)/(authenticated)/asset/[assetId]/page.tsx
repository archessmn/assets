export default async function PrivateAssetPage({
  params,
}: {
  params: Promise<{ assetId: string }>;
}) {
  const awaitedParams = await params;

  return <>{awaitedParams.assetId}</>;
}
