export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  let buf = Buffer.from('');
  const meta = {} as { [index: string]: string };

  data?.forEach(async (item) => {
    if (item.name === 'img') {
      buf = item.data;
    } else {
      meta[item.name!] = item.data.toString();
    }
  });

  //   check for metadata and buffer.
  if (Object.keys(meta).length === 0 || buf.length === 0) {
    return new Response('Bad Request ', { status: 400 });
  }

  //   get current timestamp
  const timestamp = String(Date.now());
  const kv = useKV();
  const success = await kv.setKey(timestamp, buf!, meta);

  return success ? new Response('ok') : new Response('Internal Server Error', { status: 500 });
});
