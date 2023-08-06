import styled from "@emotion/styled";
import Icon from "components/Icon/Icon";
import Spacing from "components/Spacing/Spacing";
import Text from "components/Text/Text";
import BackTitle from "components/Title/BackTitle";
import { Route } from "constants/Route";
import { useRouter } from "next/router";

export default function Setting() {
  const router = useRouter();
  const settingProfile = [
    { text: "프로필 수정", route: "EDIT_PROFILE" },
    { text: "알림 설정", route: "NOTIFICATION" },
    { text: "로그아웃", route: "" },
    { text: "회원 탈퇴", route: "DELETE_PROFILE" },
  ];
  const settingHelp = [
    { text: "공지사항", route: "ANNOUNCEMENT" },
    { text: "문의하기", route: "INQUIRY" },
    { text: "개인 정보 처리 방침", route: "PRIVACY_POLICY" },
  ];

  const handleClickSetting = (route: string) => {
    if (route) {
      router.push(Route[route]());
    } else {
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
                onClick={() => handleClickSetting(setting.route)}
              >
                {setting.text}
                <Icon
                  icon="Chevron"
                  width={24}
                  height={24}
                  color="N100"
                  rotate={90}
                />
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
                onClick={() => handleClickSetting(setting.route)}
              >
                {setting.text}
                <Icon
                  icon="Chevron"
                  width={24}
                  height={24}
                  color="N100"
                  rotate={90}
                />
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
