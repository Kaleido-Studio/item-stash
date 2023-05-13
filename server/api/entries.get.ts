export default defineEventHandler(async () => {
  const kv = useKV();
  const keys = await kv.getKeys();
  return keys;
});
