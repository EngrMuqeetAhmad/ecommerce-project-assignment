import jwt from 'jsonwebtoken';

function extractSensitiveData(
  data: Array<any>,
  indexToDecrypt: string,
): Array<any> {
  const newData: Array<any> = [];

  data?.map((item) => {
    jwt.verify(item[indexToDecrypt], 'MuqeetAhmad', (err: any, d: any) => {
      if (err) {
        return item[indexToDecrypt];
      }
      item[indexToDecrypt] = d;
      newData.push(item);
    });
  });
  return newData;
}

export { extractSensitiveData };
