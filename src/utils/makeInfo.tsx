export const makeInfo = (data: any): any => {
  const snsUrlSplit = data?.snsUrl ? data?.snsUrl.split("/") : [];
  const InfoData = [
    {
      title: "음식점 정보",
      info_list: [
        {
          info_title: "위치",
          info_desc: `${data?.address?.sido} ${data?.address?.sgg} ${data?.address?.lotNumberAddress}`,
          copy: true,
        },
        {
          info_title: "운영시간",
          info_desc:
            data?.openingHours?.length === 0 ? (
              `없음`
            ) : (
              <>
                {data?.openingHours?.map((time: any, idx: number) => (
                  <div key={idx}>{time}</div>
                ))}
                {data?.openingHoursDtos?.map((time: any, idx: number) => (
                  <div key={idx}>{time}</div>
                ))}
              </>
            ),
        },
        {
          info_title: "휴무일",
          info_desc: data?.closingHours
            ? data?.closingHours
                ?.split("\n")
                .map((time: any, idx: number) => <div key={idx}>{time}</div>)
            : `없음`,
        },
      ],
    },
    {
      title: "문의 연락",
      info_list: [
        {
          info_title: "전화번호",
          info_desc: data?.phone === "" ? `없음` : data?.phone,
        },
        {
          info_title: "인스타",
          info_desc: data?.snsUrl
            ? `@${
                snsUrlSplit[snsUrlSplit.length - 1] === ""
                  ? snsUrlSplit[snsUrlSplit.length - 2]
                  : snsUrlSplit[snsUrlSplit.length - 1]
              }`
            : `없음`,
        },
      ],
    },
  ];
  return InfoData;
};
