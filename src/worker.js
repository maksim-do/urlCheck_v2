import request from 'superagent';
import {
  parentPort, workerData,
} from 'worker_threads';

// eslint-disable-next-line no-useless-escape
const regularSentenceForFilter = new RegExp('\ айт (не( |)доступен|выставлен на продажу)|(упить|родлить) этот домен|page cannot be display|Единый реес|suspended domain', 'ig');
const attemptcount = 1;

const isRedirect = (url, answer) => {
  if (answer.redirects.length === 0) return false;
  // eslint-disable-next-line no-useless-escape
  const filter = `htt(p|ps):\/\/${url}\/`;
  const urlRegExp = new RegExp(filter, 'ig');
  const answerUrl = answer.redirects[answer.redirects.length - 1];
  return answerUrl.search(urlRegExp) === -1;
};

const isStopper = (sentece, regExp) => sentece.search(regExp) >= 0;

const isOmission = (url, answer) => {
  if (answer.status !== 200) return false;
  if (isRedirect(url, answer)) return false;
  if (isStopper(answer.text, regularSentenceForFilter)) return false;
  return true;
};

const getResponse = async (url, attempt) => {
  try {
    const answer = await request.get(`http://${url}`).timeout({
      response: 20000 + Math.random() * 5000, // Wait 5 seconds for the server to start sending,
      deadline: 30000, // but allow 1 minute for the file to finish loading.
    });
    // const endNameHost = answer.redirects.length === 0 ? url
    //  : answer.redirects[answer.redirects.length - 1];
    console.log(`Domain ${url} ответ получен`); // редирект ${isRedirect(url, answer)} фильтр ${isStopper(answer.text, regularSentenceForFilter)}`);
    return {
      url,
      cheskResult: isOmission(url, answer),
    };
  } catch (_err) {
    if (attempt === 1 || _err.code === 'ECONNABORTED') {
      console.log(`Domain ${url} unavailable`, _err.code, _err.errno);
      return {
        url,
        cheskResult: false,
      };
    }
    return getResponse(url, attempt - 1);
  }
};

const сheсkList = async (domains) => {
  let resultCheckList = [];
  for (let i = 0; i < domains.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const resultCheckDomain = await getResponse(domains[i], attemptcount);
    resultCheckList = [...resultCheckList, resultCheckDomain];
  }
  parentPort.postMessage(resultCheckList.filter(({ cheskResult }) => cheskResult)
    .map(({ url }) => url));
};

сheсkList(workerData);
