export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  let buf = Buffer.from('');
  const meta = {} as { [index: string]: string };
  let name;
  const timestamp = String(Date.now());

  data?.forEach(async (item) => {
    if (item.name === 'img') {
      buf = item.data;
    } else {
      meta[item.name!] = item.data.toString();
      if (item.name === 'name') {
        name = encodeURIComponent(item.data.toString());
      }
    }
  });

  const redirectUrl = new URL('/result', 'https://item.0w0.al');
  redirectUrl.searchParams.append('name', name ?? '未知物品');
  redirectUrl.searchParams.append('time', timestamp);

  //   check for metadata and buffer.
  if (Object.keys(meta).length === 0 || buf.length === 0) {
    redirectUrl.searchParams.append('success', 'false');
    return sendRedirect(event, redirectUrl.toString(), 302);
  }

  const kv = useKV();
  const success = await kv.setKey(timestamp, buf, meta);

  redirectUrl.searchParams.append('success', String(success));
  return sendRedirect(event, redirectUrl.toString(), 302);
});
