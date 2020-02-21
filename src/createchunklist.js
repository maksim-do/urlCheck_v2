const createChunkList = (list, sizeChunk, chunks = []) => {
  if (list.length === 0) return chunks;
  const endChunk = list.length < sizeChunk;
  const chunk = endChunk ? list.slice() : list.slice(0, sizeChunk);
  const newList = endChunk ? [] : list.slice(sizeChunk);
  return createChunkList(newList, sizeChunk, [...chunks, chunk]);
};

export default createChunkList;
