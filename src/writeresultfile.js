import fs from 'fs';
import { getDateTime } from './getDataTime';

const beginFile = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body></body>';
const endFile = '</body></html>';
const getNameFile = () => {
  const date = getDateTime(new Date());
  const {
    hours, minutes, seconds, day, month, year,
  } = date;
  return `${hours}-${minutes}-${seconds}_${day}-${month}-${year}.html`;
};

export default (list, sentence) => {
  console.log(list);
  const fileName = getNameFile();
  fs.writeFileSync(`${fileName}`, beginFile);
  const resultCheck = list.map((el) => `<br><a href="http://${el}">http://${el}</a><br>`);
  const bodyFile = `${sentence}${resultCheck.join('')}`;
  fs.appendFileSync(fileName, bodyFile);
  fs.appendFileSync(fileName, endFile);
  console.log(`По результатам проверки создан файл ${fileName}`);
  return fileName;
};
