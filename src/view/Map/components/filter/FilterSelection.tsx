import { useRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useAppSelector, useSearch } from "@/hooks";
import { Icon } from "@/components";

import { colors } from "@/constants/colors";
import { atmosphereKeyword } from "@/constants/globalData";

import RoundButton from "@/components/Button/RoundButton";
import { Space, Text } from "@/components/core";

export function FilterSelection({}: any) {
  const router = useRouter();
  const filterRef = useRef<any>(null);
  const { foodType, dayOfWeek, mood } = useAppSelector((state) => state.search);
  const { handleFilterVisible, handleMood } = useSearch();

  const clickFilterButton = (val: any) => {
    if (mood === val) handleMood("");
    else handleMood(val);
  };

  const num: number =
    dayOfWeek.length + (foodType !== "" ? 1 : 0) + (mood !== "" ? 1 : 0);

  return (
    <div style={{ position: "relative" }}>
      <ButtonWrapper ref={filterRef} onClick={() => handleFilterVisible(true)}>
        <Icon icon="Filter" width={16} height={16} color="Orange600" />
        <Text ml={6} typo="Headline2" c="Orange600">
          {num}
        </Text>
      </ButtonWrapper>
      <ScrollWrapper>
        <div style={{ minWidth: num > 9 ? 88 : 80 }} />
        <ScrollInner>
          {atmosphereKeyword.map((data: any, idx: number) => {
            return (
              <ScrollList
                key={idx}
                marginRight={idx === atmosphereKeyword.length - 1}
              >
                <RoundButton
                  type="full"
                  action={data.val === mood}
                  onClick={() => clickFilterButton(data.val)}
                >
                  {data.val}
                </RoundButton>
              </ScrollList>
            );
          })}
        </ScrollInner>
      </ScrollWrapper>
      <Space h={14} />
    </div>
  );
}

const ButtonWrapper = styled.div`
  height: 36px;
  padding: 0 13px;
  display: flex;
  align-items: center;

  position: absolute;
  left: 15px;

  border-radius: 48px;
  border: 1.152px solid ${colors.Orange600};
  background-color: ${colors.N0};
`;

const ScrollWrapper = styled.div`
  display: flex;
  white-space: nowrap;
`;

const ScrollInner = styled.div`
  display: flex;
  overflow: auto;
`;

const ScrollList = styled.div<{ marginRight: boolean }>`
  margin-right: ${({ marginRight }) => (marginRight ? `15px` : "6px")};
  display: flex;
`;
// import { useRef } from "react";
// import { useRouter } from "next/router";
// import { Box, Button, Flex, Space, Text } from "@/components/core";
// import { useAppSelector } from "@/hooks/useReduxHooks";
// import useSearch from "@/hooks/useSearch";

// import { colors } from "@/constants/colors";
// import { atmosphereKeyword } from "@/constants/globalData";

// import Icon from "@/components/Icon";
// import { typography } from "@/constants/typography";

// const FilterSelection = () => {
//   const router = useRouter();
//   const filterRef = useRef<any>(null);
//   const { foodType, dayOfWeek, mood } = useAppSelector((state) => state.search);
//   const { handleFilterVisible, handleMood } = useSearch();

//   const handleClickFilter = (val: any) => {
//     if (mood === val) handleMood("");
//     else handleMood(val);
//   };

//   const num: number =
//     dayOfWeek.length + (foodType !== "" ? 1 : 0) + (mood !== "" ? 1 : 0);

//   return (
//     <Box pos="relative">
//       <Flex
//         ref={filterRef}
//         h={36}
//         ph={13}
//         pos="absolute"
//         left={15}
//         bg={colors["N0"]}
//         style={{
//           alignItems: "center",
//           borderRadius: 48,
//           border: `1.152px solid ${colors["Orange600"]}`,
//         }}
//         onClick={() => handleFilterVisible(true)}
//       >
//         <Icon icon="Filter" width={16} height={16} color="Orange600" />
//         <Text ml={6} c={colors["Orange600"]} style={typography["Headline2"]}>
//           {num}
//         </Text>
//       </Flex>
//       <Flex>
//       <Box miw={num > 9 ? 88 : 80} />
//       <Flex pr={15} wrap="nowrap" gap={6} style={{ overflowX: "auto" }}>
//         {atmosphereKeyword.map((data: any, idx: number) => {
//           return (
//             <Flex key={idx}>
//               <Button
//                 h={38}
//                 radius={12}
//                 c={colors[data.val === mood ? "N0" : "N100"]}
//                 bg={colors[data.val === mood ? "Orange600" : "N0"]}
//                 style={{
//                   padding: "0 16px",
//                   border: `1px solid ${
//                     colors[data.val === mood ? "Orange600" : "N40"]
//                   }`,
//                 }}
//                 onClick={() => handleClickFilter(data.val)}
//               >
//                 {data.val}
//               </Button>
//             </Flex>
//           );
//         })}
//       </Flex>
//       </Flex>
//       <Space h={14} />
//     </Box>
//   );
// };

// export default FilterSelection;
