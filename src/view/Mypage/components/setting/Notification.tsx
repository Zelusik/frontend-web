import styled from "@emotion/styled";
import { Space } from "@/components/core";
import BackTitle from "@/components/Title/BackTitle";
import { colors, typography } from "@/constants";
import React, { useState } from "react";

const Notification = () => {
  const notificationList = ["저장한 가게 오픈 알림 설정", "알림 설정"];
  const [checked, setChecked] = useState<string[]>([]);

  const handleClickToggle = (text: string) => {
    if (checked.includes(text)) {
      setChecked(checked.filter((e) => e !== text));
    } else {
      setChecked([...checked, text]);
    }
  };
  return (
    <NotificationWrapper>
      <BackTitle type="black-left-text" text="알림설정" />
      <Space h={20} />
      <ToggleButtonWrapper>
        {notificationList.map((text) => (
          <div className="toggle-box" key={text}>
            {text}
            <ToggleButton
              onClick={() => {
                handleClickToggle(text);
              }}
            >
              <div
                className={`toggle-container ${
                  checked.includes(text) ? "toggle-checked-bg" : null
                }`}
              />
              <div
                className={`toggle-circle ${
                  checked.includes(text) ? "toggle-checked-circle" : null
                }`}
              />
            </ToggleButton>
          </div>
        ))}
      </ToggleButtonWrapper>
    </NotificationWrapper>
  );
};

const NotificationWrapper = styled.div`
  padding: 0 20px;
  height: 100vh;
  overflow-y: scroll;
`;
const ToggleButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  .toggle-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    ${typography.Paragraph6};
    color: ${colors.N80} !important;
  }
`;
const ToggleButton = styled.div`
  position: relative;
  left: 0;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 30px;
    border-radius: 24px;
    background-color: ${colors.N40};
  }
  > .toggle-checked-bg {
    background-color: ${colors.Orange500};
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 2px;
    left: 3px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${colors.N0};
    transition: 0.5s;
  }
  > .toggle-checked-circle {
    left: 23px;
    transition: 0.5s;
    background-color: ${colors.N0};
  }
`;

export default Notification;
