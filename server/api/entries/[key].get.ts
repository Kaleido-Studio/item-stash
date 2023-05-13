export default defineEventHandler(async (event) => {
  const { key } = event.context.params!;

  const kv = useKV();
  const entry = (await kv.getKey(key)) as Blob;

  return entry.text();
});
