import React from 'react';
import styled from '@emotion/styled';
import BottomButton from 'components/Button/BottomButton';
import Icon from 'components/Icon';
import { Space, Text } from 'components/core';
import { Route } from 'constants/Route';
import { useRouter } from 'next/router';
import ErrorIcon from 'assets/Error.svg';
import { colors } from 'constants/colors';

const Error = () => {
  const router = useRouter();
  const errorCode = router.query.errorCode;

  const handleRouteHome = () => {
    router.replace(Route.HOME());
  };

  return (
    <ErrorWrapper>
      <BackHeader onClick={handleRouteHome}>
        <Icon icon="XButton" />
      </BackHeader>
      <Space h={40} />
      <Text
        typo="Headline6"
        style={{
          whiteSpace: 'pre-line',
        }}
      >{`서비스 이용에\n불편을 드려 죄송합니다`}</Text>
      <Space h={4} />
      {errorCode && (
        <Text typo="Paragraph5" c="N60">{`에러코드 : ${errorCode}`}</Text>
      )}

      <Space h={54} />
      <div style={{ textAlign: 'center' }}>
        <ErrorIcon />
      </div>
      <Space h={60} />
      <TextWrapper>
        <Title>
          <Text typo="Headline2">문의가 있으신가요?</Text>
          <Icon
            icon="Chevron"
            width={20}
            height={20}
            onClick={() => router.push(Route.INQUIRY())}
          />
        </Title>
        <Text
          typo="Paragraph4"
          c="N80"
          style={{
            whiteSpace: 'pre-line',
          }}
        >{`이메일로 문의를 주시면 1-2일 내에\n답변이 전송됩니다.`}</Text>
      </TextWrapper>

      <BottomWrapper>
        <BottomButton
          text="홈으로 이동"
          radius={8}
          height="54px"
          onClick={handleRouteHome}
          disabled={false}
        />
      </BottomWrapper>
    </ErrorWrapper>
  );
};

export default Error;

const ErrorWrapper = styled.div`
  padding: 0 20px;
  height: 100vh;
  overflow-y: scroll;
`;

const BackHeader = styled.div`
  width: 100%;
  height: 45px;

  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  margin-bottom: 40px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 18px 16px;
  border-radius: 16px;
  background-color: ${colors.N10};
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
