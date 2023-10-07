import React from "react";
import styled from "@emotion/styled";
import Icon from "components/Icon/Icon";
import BackTitle from "components/Title/BackTitle";
import { Space, Text } from "components/core";

const Announcement = () => {
  const announcementList = [
    "2023.04. 잇터리 업데이트 안내",
    "2023.03. 오류로 인한 일부 서비스 이용 제한 안내",
  ];
  return (
    <AnnouncementWrapper>
      <BackTitle type="black-left-text" text="공지사항" />
      <Space h={20} />
      <Section>
        {announcementList.map((title: string) => (
          <div className="section-container" key={title} onClick={() => {}}>
            <Text typo="Paragraph5" c="N100">
              {title}
            </Text>
            <Icon icon="Chevron" width={20} height={20} color="N100" />
          </div>
        ))}
      </Section>
    </AnnouncementWrapper>
  );
};

const AnnouncementWrapper = styled.div`
  padding: 0 20px;
  height: 100vh;
  overflow-y: scroll;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  .section-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
export default Announcement;
