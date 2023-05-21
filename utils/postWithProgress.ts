/*
deprecated, please do not use this function
*/
const superPost = async (
  path: string,
  data: FormData,
  changeProcess: (process: number) => void,
) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', path);
  xhr.send(data);
  xhr.upload.addEventListener('progress', (event) => {
    const process = Math.round((event.loaded / event.total) * 100);
    changeProcess(process);
  });
  const result = new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
  });

  return result;
};

export default superPost;
