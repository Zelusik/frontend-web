import styled from "@emotion/styled";

import { colors } from "constants/colors";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Spacing from "components/Spacing/Spacing";

import Icon from "components/Icon";
import { termsData } from "data/termsData";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { changeAuthTermsInfo } from "reducer/slices/auth/authSlice";
import { typography } from "constants/typography";
import Link from "next/link";
import BottomButton from "components/Button/BottomButton";
import { Route } from "constants/Route";

const TermsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { terms } = useAppSelector((state) => state.auth);

  useEffect(() => {
    termsData.map((term) =>
      dispatch(
        changeAuthTermsInfo({
          type: term.key,
          value: false,
        })
      )
    );
  }, [dispatch]);

  const handleClickAllTerms = () => {
    const trueCount = Object.values(terms).filter((value) => value === true).length;
    if (trueCount === 5) {
      termsData.map((term) =>
        dispatch(
          changeAuthTermsInfo({
            type: term.key,
            value: false,
          })
        )
      );
    } else {
      termsData.map((term) =>
        dispatch(
          changeAuthTermsInfo({
            type: term.key,
            value: true,
          })
        )
      );
    }
  };

  const handleClickTerms = (term: any) => {
    dispatch(
      changeAuthTermsInfo({
        type: term.key,
        value: !terms[term.key],
      })
    );
  };

  const handleClickBackBtn = () => {
    router.push(Route.LOGIN());
  };
  const handleClickNextBtn = () => {
    router.push(Route.TASTE());
  };

  return (
    <TermsWrapper>
      <TopWrapper>
        <BackTitle>
          <Icon
            icon="LeftArrow"
            width={24}
            height={24}
            color="N100"
            onClick={handleClickBackBtn}
          />
        </BackTitle>
      </TopWrapper>
      <MainWrapper>
        <Spacing size={30} />
        <span style={typography.Headline6}>약관에 동의해 주세요</span>
        <Spacing size={30} />
        <AllCheckContainer onClick={handleClickAllTerms}>
          <Icon
            icon="Select"
            style={{
              path: {
                fill:
                  Object.values(terms).filter((value) => value === true).length === 5
                    ? colors.N100
                    : colors.N20,
                stroke: "none",
              },
              "path:last-child": {
                stroke:
                  Object.values(terms).filter((value) => value === true).length === 5
                    ? colors.N0
                    : colors.N50,
              },
            }}
          />
          <div style={typography.Headline4}>전체 동의하기</div>
        </AllCheckContainer>
        <Spacing size={30} />
        <TermsContainer>
          {termsData.map((term) => {
            return (
              <TermContainer key={term.key}>
                <div>
                  <Icon
                    icon="Check"
                    onClick={() => handleClickTerms(term)}
                    color={terms[term.key] ? "N80" : "N40"}
                  />
                  <p>{term.val}</p>
                </div>
                {term.link && (
                  <Link href={term.link} target="_blank">
                    <Icon icon="Chevron" color="N60" width={16} height={16} />
                  </Link>
                )}
              </TermContainer>
            );
          })}
        </TermsContainer>
      </MainWrapper>
      <ButtonWrapper>
        <BottomButton
          text="다음으로"
          radius={8}
          backgroundColor={
            terms.isNotMinor && terms.service && terms.userInfo
              ? colors.Orange500
              : colors.Orange200
          }
          color={colors.N0}
          height="56px"
          disabled={
            terms.isNotMinor && terms.service && terms.userInfo ? false : true
          }
          onClick={handleClickNextBtn}
        />
      </ButtonWrapper>
    </TermsWrapper>
  );
};

const TermsWrapper = styled.div``;
const TopWrapper = styled.div`
  padding: 30px 20px 0;
`;
const BackTitle = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const MainWrapper = styled.div`
  padding: 0 20px;
`;
const AllCheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  height: 76px;
  border-radius: 12px;
  background-color: ${colors.N0};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
  align-items: center;
  padding: 0 25px;
`;

const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const TermContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: row;
    gap: 12px;
    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 140%;
      color: ${colors.N80};
      margin: 0;
    }
  }
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px 50px;
`;
export default TermsPage;
