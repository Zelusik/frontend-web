import styled from "@emotion/styled";
import Icon from "components/Icon/Icon";
import Spacing from "components/Spacing/Spacing";
import Text from "components/Text/Text";
import BackTitle from "components/Title/BackTitle";
import { Route } from "constants/Route";
import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";

export default function Setting() {
  const router = useRouter();
  const { openAlert } = useAlert();
  const settingProfile = [
    { text: "프로필 수정", route: "EDIT_PROFILE" },
    { text: "음식 취향 수정", route: "EDIT_TASTE" },
    { text: "알림 설정", route: "NOTIFICATION" },
    { text: "로그아웃", route: "" },
    { text: "회원 탈퇴", route: "DELETE_PROFILE" },
  ];
  const settingHelp = [
    { text: "공지사항", route: "ANNOUNCEMENT" },
    { text: "문의하기", route: "INQUIRY" },
    { text: "개인정보 처리방침", route: "" },
  ];

  const handleClickSetting = (setting: { text: string; route: string }) => {
    if (setting.route) {
      router.push(Route[setting.route]());
    } else {
      if (setting.text === "로그아웃") {
        openAlert("logout");
      } else {
        window.open(
          "https://asdfqweasd.notion.site/b22be65e8d0641cf814d51bcd8c6794a?pvs=4"
        );
      }
    }
  };
  return (
    <SettingWrapper>
      <BackTitle type="black-left-text" text="설정" />
      <Spacing size={20} />
      <SettingContainer>
        <div>
          <Text typo="Paragraph3" color="N60">
            개인
          </Text>
          <Spacing size={26} />
          <Section>
            {settingProfile.map((setting: any) => (
              <div
                className="section-container"
                key={setting.text}
                onClick={() => handleClickSetting(setting)}
              >
                {setting.text}
                <Icon icon="Chevron" width={24} height={24} color="N100" />
              </div>
            ))}
          </Section>
        </div>
        <div>
          <Text typo="Paragraph3" color="N60">
            도움말
          </Text>
          <Spacing size={26} />
          <Section>
            {settingHelp.map((setting: any) => (
              <div
                className="section-container"
                key={setting.text}
                onClick={() => handleClickSetting(setting)}
              >
                {setting.text}
                <Icon icon="Chevron" width={24} height={24} color="N100" />
              </div>
            ))}
          </Section>
        </div>
      </SettingContainer>
    </SettingWrapper>
  );
}
const SettingWrapper = styled.div`
  padding: 0 20px;
  height: 100vh;
  overflow-y: scroll;
`;
const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
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
