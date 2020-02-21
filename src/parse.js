import fs from 'fs';

const parse = (fileName) => {
  try {
    return fs.readFileSync(fileName).toString().split('\n');
  } catch (_err) {
    console.log(`Ошибка чтения файла ${fileName}`);
    throw _err;
  }
};

export default parse;
