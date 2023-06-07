import bcrypt from 'bcryptjs';

bcrypt.setRandomFallback((num: number) => Array.from(crypto.getRandomValues(new Int32Array(num))));

export default defineEventHandler(async (event) => {
  const { authorization } = event.node.req.headers;
  if (!authorization) {
    setResponseStatus(event, 401);
    return { message: 'Unauthorized' };
  }
  const password = authorization.split(' ')[1];
  if (!password) {
    setResponseStatus(event, 401);
    return { message: 'Unauthorized' };
  }
  const runtimeCfg = useRuntimeConfig();
  const success = await bcrypt.compare(password, runtimeCfg.PASSWORD);
  if (!success) {
    setResponseStatus(event, 401);
    return { message: 'Unauthorized' };
  }

  const { key } = event.context.params!;

  const kv = useKV();
  const entry = (await kv.getKey(key)) as Blob;

  return entry.text();
});
