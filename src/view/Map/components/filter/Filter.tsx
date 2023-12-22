import { useRouter } from "next/router";
import styled from "@emotion/styled";
import RoundButton from "@/components/Button/RoundButton";
import { Space, Text } from "@/components/core";

export function Filter({ type, filterData }: any) {
  const router = useRouter();

  const buttonAction = (val: string) => {
    const newInclude = filterData.new ? filterData.new.includes(val) : false;
    return newInclude;
  };

  const clickFilterButton = (val: string) => {
    const newInclude = filterData.new ? filterData.new.includes(val) : false;

    switch (type) {
      case "full":
        if (newInclude) filterData.Fn("");
        else filterData.Fn(val);
        break;
      case "full-radius":
        if (newInclude)
          filterData.Fn(filterData.new.filter((d: any) => d !== val));
        else filterData.Fn([...filterData.new, val]);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <Text typo="Headline4" c="N100">
        {filterData?.text}
      </Text>
      <Space h={16} />

      <ButtonWrapper>
        {filterData?.textList?.map((filterData2: any, idx: number) => {
          return (
            <RoundButton
              key={idx}
              type={type}
              action={buttonAction(filterData2.val)}
              onClick={() => clickFilterButton(filterData2.val)}
            >
              {filterData2.val}
            </RoundButton>
          );
        })}
      </ButtonWrapper>

      {type === "full-radius" && (
        <>
          <Space h={16} />
          <Text typo="Paragraph1" c="N80">
            해당 요일에 오픈하는 음식점만 보여드릴게요.
          </Text>
        </>
      )}
      <Space h={40} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// import { Button, Flex, Space, Text } from "@/components/core";
// import { typography } from "@/constants/typography";
// import { colors } from "@/constants/colors";
// import { FilterDatasProps } from "@/models/view/mapModel";

// interface FilterProps {
//   key?: number;
//   type: string;
//   filterData: FilterDatasProps;
// }

// const Filter = ({ type, filterData }: FilterProps) => {
//   const buttonAction = (val: string) => {
//     const newInclude = filterData?.new ? filterData?.new.includes(val) : false;
//     return newInclude;
//   };

//   const clickFilterButton = (val: string) => {
//     const newInclude = filterData?.new ? filterData?.new.includes(val) : false;

//     switch (type) {
//       case "full":
//         if (newInclude) filterData?.Fn("");
//         else filterData?.Fn(val);
//         break;
//       case "full-radius":
//         if (newInclude)
//           filterData?.Fn(
//             filterData?.new?.filter((filterData: string) => filterData !== val)
//           );
//         else filterData?.Fn([...filterData.new, val]);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <Flex ph={20} direction="column">
//       <Text c={colors["N100"]} style={typography["Headline4"]}>
//         {filterData?.text}
//       </Text>
//       <Space h={16} />

//       <Flex wrap="wrap" gap={8}>
//         {filterData?.textList?.map((filterData: { val: string }, idx: number) => {
//           return (
//             <Button
//               key={idx}
//               h={38}
//               radius={type === "full-radius" ? 38 : 12}
//               c={colors[buttonAction(filterData.val) ? "N0" : "N100"]}
//               bg={colors[buttonAction(filterData.val) ? "Orange600" : "N0"]}
//               style={{
//                 width: type === "full-radius" ? 38 : "auto",
//                 padding: type === "full-radius" ? 0 : "0 16px",
//                 border: `1px solid ${
//                   colors[buttonAction(filterData.val) ? "Orange600" : "N40"]
//                 }`,
//               }}
//               onClick={() => clickFilterButton(filterData.val)}
//             >
//               {filterData.val}
//             </Button>
//           );
//         })}
//       </Flex>

//       {type === "full-radius" && (
//         <>
//           <Space h={16} />
//           <Text c={colors["N80"]} style={typography["Paragraph1"]}>
//             해당 요일에 오픈하는 음식점만 보여드릴게요.
//           </Text>
//         </>
//       )}
//       <Space h={40} />
//     </Flex>
//   );
// };

// export default Filter;
