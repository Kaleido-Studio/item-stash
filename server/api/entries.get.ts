import bcrypt from 'bcryptjs';

bcrypt.setRandomFallback((num: number) => Array.from(crypto.getRandomValues(new Int32Array(num))));

export default defineEventHandler(async (e) => {
  const { authorization } = e.node.req.headers;
  if (!authorization) {
    setResponseStatus(e, 401);
    return { message: 'Unauthorized' };
  }
  const password = authorization.split(' ')[1];
  if (!password) {
    setResponseStatus(e, 401);
    return { message: 'Unauthorized' };
  }
  const runtimeCfg = useRuntimeConfig();
  const success = await bcrypt.compare(password, runtimeCfg.PASSWORD);
  if (!success) {
    setResponseStatus(e, 401);
    return { message: 'Unauthorized' };
  }
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
