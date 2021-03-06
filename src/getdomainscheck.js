import createWorker from './create_worker';
import createChunkList from './createchunklist';
import { getDateTimeString } from './getDataTime';

const getRandomMix = (arr) => arr.slice()
  .sort(() => Math.random() - 0.5);

const checkDomains = async (list) => {
  console.log(`Формирование пачек на проверку ${getDateTimeString(new Date())}`);
  const chunksToCheck = createChunkList(list, 750);
  console.log(`Сформировано ${chunksToCheck.length} пачек`);
  const checkChunk = async (chunk) => {
    console.log(`Создание потоков ${getDateTimeString(new Date())}`);
    const chunks = createChunkList(chunk, 25);
    console.log(`Создано ${chunks.length} потоков`);
    const workers = chunks.map(createWorker);
    return (await Promise.all(workers)).flat();
  };
  let resultCheckList = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const chunk of chunksToCheck) {
    // eslint-disable-next-line no-await-in-loop
    const resultCheckChunk = await checkChunk(chunk);
    resultCheckList = [...resultCheckList, ...resultCheckChunk];
  }
  return resultCheckList;
};

const getDomainsCheck = async (domains, attemptCounts, resultCheckList = []) => {
  if (attemptCounts === 0) return Array.from(new Set(resultCheckList));
  const resultAttemptCheck = await checkDomains(getRandomMix(domains));
  const resultCheck = await getDomainsCheck(domains,
    attemptCounts - 1, [...resultCheckList, ...resultAttemptCheck]);
  return resultCheck;
};

export default getDomainsCheck;
