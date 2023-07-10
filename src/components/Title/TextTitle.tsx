import styled from "@emotion/styled";
import Edit from "components/Edit";
import { colors } from "constants/colors";

export default function TextTitle({
  title,
  subtitle,
  backIcon,

  titleTypo,
  titleMargin,
  subTitleTypo,
  subTitleMargin,
}: any) {
  return (
    <TitleWrapper>
      <MenuList>
        <Menu>
          <div>
            {title && <div style={{ margin: titleMargin }}>{title}</div>}
            {subtitle && (
              <div style={{ margin: subTitleMargin }}>{subtitle}</div>
            )}
          </div>
        </Menu>

        <Menu>{backIcon}</Menu>
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
`;

const MenuList = styled.ul`
  width: 100%;
  margin: auto 0;

  display: flex;
  justify-content: space-between;
`;

const Menu = styled.li`
  margin: auto 0;

  display: flex;
  align-items: center;
`;
