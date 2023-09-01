export const getTimeSinceVisit = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const difference = now.getTime() - createdDate.getTime();

  const minutes = Math.floor(difference / (60 * 1000));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전에 작성됨`;
  } else if (hours > 0) {
    return `${hours}시간 전에 작성됨`;
  } else if (minutes > 0) {
    return `${minutes}분 전에 작성됨`;
  } else {
    return "방금 작성됨";
  }
};
