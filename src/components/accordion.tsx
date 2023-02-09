import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import FONT from '../constants/fonts';
import COLOR from '../constants/theme';
import { Down, Up } from './icons/BtnIcons';
import { FoodIcon } from './icons/FoodIcons';
import tw from 'tailwind-styled-components';
import { Content } from '../interfaces/main';

const customAnimation = keyframes`
0% {
  opacity: 0;
        transform: translateY(-1.25em);
}
100% {
  opacity: 1;
        transform: translateY(0);
}
`;
export default function Accordion(props: Content) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Header onClick={() => setOpen((prev) => !prev)}>
        <Box>
          <FlexBox css={FONT.BODY_1}>
            <FoodIcon name={props.icon_type}></FoodIcon>
            <Text css={FONT.BODY_1}>{props.title}</Text>
          </FlexBox>
          <IconWrapper>{isOpen ? <Up /> : <Down />}</IconWrapper>
        </Box>
      </Header>
      {isOpen && (
        <Wrapper isOpen={isOpen}>
          <ImgWrapper>
            <Img img={props.full_image}></Img>
            <div css={FONT.BUTTON}>1큰술</div>

            <div css={FONT.DETAIL_2}>{props.full}</div>
          </ImgWrapper>
          <ImgWrapper>
            <Img img={props.half_image}></Img>
            <div css={FONT.BUTTON}>1/2큰술</div>

            <div css={FONT.DETAIL_2}>{props.half}</div>
          </ImgWrapper>
        </Wrapper>
      )}
    </>
  );
}

const Text = styled.div`
  padding-left: 10px;
  color: ${COLOR.TYPEFACE_BLACK};
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: flex-start;
  vertical-align: top;
`;
const ImgWrapper = styled.div`
  width: 157px;
  //height: 265px;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  transition: 0.3s ease;
  /* transition: 0.3s ease-in-out; */
`;
const Img = styled.div<{ img: string }>`
  width: 157px;
  height: 193px;
  margin-bottom: 8px;
  border-radius: 12px;
  background-image: url(${(props) => props.img});
  background-size: cover;
`;

const Wrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  transition: 0.3s ease;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  ${(props) =>
    props.isOpen &&
    css`
      animation: ${customAnimation} 0.1s linear alternate;
    `}
`;
const Header = styled.button`
  width: 100%;
  height: 58px;
  background-color: ${COLOR.BG_GRAY1};
  border-radius: 12px;
  margin-bottom: 12px;
`;
const Box = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 18px;
  padding-left: 18px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const DownIcon = styled(Down)<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
  transition: all 0.2s ease;
`;
