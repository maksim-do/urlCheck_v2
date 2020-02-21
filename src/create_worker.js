import {
  Worker,
} from 'worker_threads';

export default (domains) => new Promise((resolve, reject) => {
  const worker = new Worker('./dist/worker.js', {
    workerData: domains,
  });
  worker.on('message', resolve);
  worker.on('error', reject);
  worker.on('exit', (code) => {
    if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
  });
});
