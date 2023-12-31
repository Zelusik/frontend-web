import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { colors } from 'constants/colors';

import { typography } from 'constants/typography';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHooks';
import { changeAuthState } from 'reducer/slices/auth/authSlice';

import RoundButton from 'components/Button/RoundButton';
import { getCookie } from 'utils/cookie';
import { Route } from 'constants/Route';
import BackTitle from 'components/Title/BackTitle';
import { postTerms, putTaste } from 'api/members';
import { tasteDatas } from 'constants/globalData';
import { Button, Space } from 'components/core';

const TastePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = getCookie('accessToken');
  const { favoriteFoodCategories, terms } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      changeAuthState({
        type: 'favoriteFoodCategories',
        value: [],
      })
    );
  }, [dispatch]);

  const handleClickTaste = (food: string) => {
    if (favoriteFoodCategories.includes(food)) {
      const tmpFood = favoriteFoodCategories.filter(
        (taste: string) => taste !== food
      );
      dispatch(
        changeAuthState({
          type: 'favoriteFoodCategories',
          value: tmpFood,
        })
      );
    } else {
      dispatch(
        changeAuthState({
          type: 'favoriteFoodCategories',
          value: [...favoriteFoodCategories, food],
        })
      );
    }
  };

  const handleClickStart = async () => {
    if (accessToken !== null) {
      const termsRes = await postTerms(accessToken, terms);
      const tasteRes = await putTaste(accessToken, favoriteFoodCategories);

      // refresh token 만료 시 로그인 페이지로
      if (termsRes.data?.code === 1502 || tasteRes.data?.code === 1502) {
        router.push(Route.LOGIN());
      }
      router.push(Route.HOME());
    }
  };

  return (
    <TasteWrapper>
      <TopWrapper>
        <BackTitle type="black-left-text" text="" />
      </TopWrapper>
      <MainWrapper>
        <Space h={30} />
        <span style={typography.Headline6}>좋아하는 음식을 알려주세요</span>
        <Space h={30} />
        <TasteButtonContainer>
          {tasteDatas.map((taste) => (
            <RoundButton
              key={taste.val}
              type="taste"
              action={favoriteFoodCategories.includes(taste.name)}
              onClick={() => handleClickTaste(taste.name)}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <taste.icon /> {taste.val}
              </div>
            </RoundButton>
          ))}
        </TasteButtonContainer>
      </MainWrapper>
      <ButtonWrapper>
        <Button
          w="100%"
          h={54}
          radius={8}
          disabled={favoriteFoodCategories.length > 0 ? false : true}
          onClick={handleClickStart}
          style={{
            backgroundColor: colors.Orange500,
            border: 'none',
          }}
        >
          <div className="button-text">잇터리 시작하기</div>
        </Button>
      </ButtonWrapper>
    </TasteWrapper>
  );
};

const TasteWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;
const TopWrapper = styled.div`
  padding: 30px 20px 0;
`;
const MainWrapper = styled.div`
  padding: 0 20px;
`;
const TasteButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px 50px;

  .button-text {
    ${typography.Headline3};
    color: ${colors.N0};
  }
`;
export default TastePage;
