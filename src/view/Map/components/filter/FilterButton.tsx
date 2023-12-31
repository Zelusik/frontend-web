import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useSearch from "hooks/useSearch";

import { colors } from "constants/colors";
import { Route } from "constants/Route";
import BottomButton from "components/Button/BottomButton";
import Gradient from "components/Common/Gradient";
import { useAppSelector } from "hooks/useReduxHooks";
import { equals } from "utils/equals";
import { Space } from "components/core";

export default function FilterButton({ filter }: any) {
  const router = useRouter();
  const { foodType, dayOfWeek, mood } = useAppSelector((state) => state.search);
  const {
    handleSearchType,
    handleFilterVisible,
    updateSelection,
    deleteSelection,
  } = useSearch();

  const handleClickSelection = () => {
    handleSearchType("location");
    router.push(Route.MAP());
  };

  return (
    <>
      <Gradient size={30} />
      <FilterButtonWrapper onClick={handleClickSelection}>
        <div style={{ display: "flex", gap: 8 }}>
          <BottomButton
            type="default"
            disabled={false}
            onClick={() => {
              handleFilterVisible(false);
              deleteSelection();
            }}
          >
            초기화
          </BottomButton>
          <BottomButton
            type="primary"
            disabled={
              foodType === filter.pickFoodType &&
              equals(dayOfWeek, filter.pickDayOfWeek) &&
              mood === filter.pickMood
            }
            onClick={() => {
              // handleFilterVisible(false);
              updateSelection(
                filter.pickFoodType,
                filter.pickDayOfWeek,
                filter.pickMood
              );
            }}
          >
            확인
          </BottomButton>
        </div>
        <Space h={40} />
      </FilterButtonWrapper>
    </>
  );
}

const FilterButtonWrapper = styled.div`
  width: 100%;
  padding: 0 17.5px;

  gap: 8px;
  position: fixed;
  bottom: 0;

  background-color: ${colors.N0};
  z-index: 800;
`;
// import { useRouter } from "next/router";
// import styled from "@emotion/styled";
// import useSearch from "hooks/useSearch";

// import { colors } from "constants/colors";
// import { Route } from "constants/Route";
// import BottomButton from "components/Button/BottomButton";
// import Gradient from "components/Common/Gradient";
// import { useAppSelector } from "hooks/useReduxHooks";
// import { equals } from "utils/equals";
// import { typography } from "constants/typography";
// import { Box, Button, Flex, Space } from "components/core";

// interface FilterButtonProps {
//   filter: any;
// }

// const FilterButton = ({ filter }: FilterButtonProps) => {
//   const router = useRouter();
//   const { foodType, dayOfWeek, mood } = useAppSelector((state) => state.search);
//   const {
//     handleSearchType,
//     handleFilterVisible,
//     updateSelection,
//     deleteSelection,
//   } = useSearch();

//   const handleClickSelection = () => {
//     handleSearchType("location");
//     router.push(Route.MAP());
//   };

//   return (
//     <>
//       <Gradient size={30} />
//       <Box
//         pos="fixed"
//         bottom={0}
//         bg={colors["N0"]}
//         style={{
//           width: "100%",
//           padding: "0 17.5px",
//         }}
//         onClick={handleClickSelection}
//       >
//         <Flex gap={8}>
//           <Button
//             h={54}
//             c={colors["N80"]}
//             bg={colors["N0"]}
//             radius={8}
//             style={{
//               ...typography["Paragraph6"],
//               width: "100%",
//               border: `1px solid ${colors["N40"]}`,
//             }}
//             disabled={false}
//             onClick={() => {
//               handleFilterVisible(false);
//               deleteSelection();
//             }}
//           >
//             초기화
//           </Button>
//           <Button
//             h={54}
//             radius={8}
//             c={colors["N0"]}
//             bg={
//               foodType === filter.pickFoodType &&
//               equals(dayOfWeek, filter.pickDayOfWeek) &&
//               mood === filter.pickMood
//                 ? "rgba(245, 147, 0 , .4)"
//                 : colors["Orange600"]
//             }
//             style={{
//               ...typography["Paragraph6"],
//               width: "100%",
//             }}
//             disabled={
//               foodType === filter.pickFoodType &&
//               equals(dayOfWeek, filter.pickDayOfWeek) &&
//               mood === filter.pickMood
//             }
//             onClick={() => {
//               // handleFilterVisible(false);
//               updateSelection(
//                 filter.pickFoodType,
//                 filter.pickDayOfWeek,
//                 filter.pickMood
//               );
//             }}
//           >
//             확인
//           </Button>
//         </Flex>
//         <Space h={40} />
//       </Box>
//     </>
//   );
// };

// export default FilterButton;
