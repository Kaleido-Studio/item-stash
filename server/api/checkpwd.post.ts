import bcrypt from 'bcryptjs';

bcrypt.setRandomFallback((num: number) => Array.from(crypto.getRandomValues(new Int32Array(num))));

export default defineEventHandler(async (e) => {
  const body = await readBody<{ password: string }>(e);
  const { password } = body;
  const runtimeCfg = useRuntimeConfig();

  if (!password) {
    setResponseStatus(e, 400);
    return { message: 'Bad Request' };
  }

  const success = await bcrypt.compare(password, runtimeCfg.PASSWORD);
  if (!success) {
    setResponseStatus(e, 401);
    return { message: 'Unauthorized' };
  }
  return { message: 'ok' };
});
