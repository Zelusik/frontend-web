export const makeAddress = (data: any): any => {
  const StoreData = `${data?.sido ? data?.sido : ""}  ${
    data?.sgg ? data?.sgg : ""
  } ${data?.lotNumberAddress ? data?.lotNumberAddress : ""}`;
  return StoreData;
};
