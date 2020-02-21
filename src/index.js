import checkUrlList from './getdomainscheck';
import parse from './parse';
import writeResultFile from './writeresultfile';
import { getDateTimeString, getDifferenceTimeInMinutesToString } from './getDataTime';

const attemptCounts = 3;

export default async () => {
  const startTimeCheck = new Date();
  console.log(`Старт проверки ${getDateTimeString(startTimeCheck)}`);
  console.log('Создание списка');
  const list = parse('./Domains.txt');
  console.log('Список создан');
  const resultCheckUrlList = await checkUrlList(list, attemptCounts);
  const finishTimeCheck = new Date();
  const resultSentence = `Проверка завершена ${getDateTimeString(new Date())}. Время проверки составило ${getDifferenceTimeInMinutesToString(startTimeCheck, finishTimeCheck)}. Проверено ${list.length} ресурсов. Признаков нарушений ${resultCheckUrlList.length}`;
  writeResultFile(resultCheckUrlList, resultSentence);
  console.log(resultSentence);
};
