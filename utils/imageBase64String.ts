const imageBase64String = (imageHexBinString: string) =>
  window.btoa(
    imageHexBinString
      .match(/\w{2}/g)!
      .map((a) => String.fromCharCode(parseInt(a, 16)))
      .join(''),
  );

export default imageBase64String;
