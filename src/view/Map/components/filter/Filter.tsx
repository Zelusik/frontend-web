import { Button, Flex, Space, Text } from "components/core";
import { typography } from "constants/typography";
import { colors } from "constants/colors";
import { FilterDatasProps } from "models/view/mapModel";

interface FilterProps {
  key?: number;
  type: string;
  filterData: FilterDatasProps;
}

const Filter = ({ type, filterData }: FilterProps) => {
  const buttonAction = (val: string) => {
    const newInclude = filterData?.new ? filterData?.new.includes(val) : false;
    return newInclude;
  };

  const clickFilterButton = (val: string) => {
    const newInclude = filterData?.new ? filterData?.new.includes(val) : false;

    switch (type) {
      case "full":
        if (newInclude) filterData?.Fn("");
        else filterData?.Fn(val);
        break;
      case "full-radius":
        if (newInclude)
          filterData?.Fn(
            filterData?.new?.filter((data: string) => data !== val)
          );
        else filterData?.Fn([...filterData.new, val]);
        break;
      default:
        break;
    }
  };

  return (
    <Flex ph={20} direction="column">
      <Text c={colors["N100"]} style={typography["Headline4"]}>
        {filterData?.text}
      </Text>
      <Space h={16} />

      <Flex wrap="wrap" gap={8}>
        {filterData?.textList?.map((data: { val: string }, idx: number) => {
          return (
            <Button
              key={idx}
              h={38}
              radius={type === "full-radius" ? 38 : 12}
              c={colors[buttonAction(data.val) ? "N0" : "N100"]}
              bg={colors[buttonAction(data.val) ? "Orange600" : "N0"]}
              style={{
                width: type === "full-radius" ? 38 : "auto",
                padding: type === "full-radius" ? 0 : "0 16px",
                border: `1px solid ${
                  colors[buttonAction(data.val) ? "Orange600" : "N40"]
                }`,
              }}
              onClick={() => clickFilterButton(data.val)}
            >
              {data.val}
            </Button>
          );
        })}
      </Flex>

      {type === "full-radius" && (
        <>
          <Space h={16} />
          <Text c={colors["N80"]} style={typography["Paragraph1"]}>
            해당 요일에 오픈하는 음식점만 보여드릴게요.
          </Text>
        </>
      )}
      <Space h={40} />
    </Flex>
  );
};

export default Filter;
