export default defineEventHandler(async () => {
  const kv = useKV();
  const keys = await kv.getKeys();
  return keys as {
    metadata: {
      name: string;
      time_begin: string;
      rent_qq: string;
    };
    name: string;
  }[];
});
