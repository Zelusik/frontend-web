export const getAddressInfo = (placeInfo: any) => {
  return `${placeInfo?.category} · ${placeInfo?.address?.sido}시 ${
    placeInfo?.address?.sgg
  } ${placeInfo?.address?.lotNumberAddress?.split(" ")[0]}`;
};
