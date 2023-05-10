export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  data?.forEach((item) => {
    switch (item.name) {
      case "data": {
        console.log(item.data.toString());
        break;
      }
      case "img": {
        console.log(item.data.buffer);
        break;
      }
      default: {
        console.log(item);
      }
    }
  });
  return {
    message: "ok",
  };
});
