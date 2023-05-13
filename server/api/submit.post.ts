export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  let buf;

  data?.forEach(async (item) => {
    switch (item.name) {
      case 'data': {
        console.log(item.data.toString());
        break;
      }
      case 'img': {
        buf = item.data.buffer;

        const kv = useKV();
        await kv.setKey('test', item.data, {});
        break;
      }
      default: {
        console.log(item);
      }
    }
  });
  return new Response(buf);
});
