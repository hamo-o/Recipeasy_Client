import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import FONT from '../../../constants/fonts';
import COLOR from '../../../constants/theme';

import { ClockIcon } from '../../icons/BasicIcons';
import { SaladIcon } from '../../icons/FoodIcons';
import { Themes, Recipes } from '../../../interfaces/main';
import { UseSave } from '../../../hooks/useSave';
import { useImage } from '../../../hooks/useImage';

import { SkeletonBig, SkeletonMedium, SkeletonSmall } from '../skeletons/card';

export const ImgCardMedium = (props: Themes) => {
  const router = useRouter();
  const loaded = useImage(props.landscape_image);

  return loaded ? (
    <Container>
      <MediumContainer
        onClick={() => {
          router.push(`/theme/${props.id}`);
        }}
        img={loaded}>
        <Content>
          <Title css={FONT.FOODTITLE}>{props.title}</Title>
          <SubTitle css={FONT.DETAIL_2}>
            {props.duration}일 식단 ∙ {props.recipe_count}개의 레시피
            <UseSave id={props.id} type={'Themes'} />
          </SubTitle>
        </Content>
      </MediumContainer>
    </Container>
  ) : (
    <SkeletonMedium />
  );
};

export const ImgCardSmall = ({ recipe, route }: { recipe: Recipes; route: boolean }) => {
  const router = useRouter();
  const loaded = useImage(recipe.image);

  const ing: string[] = [];
  recipe.required_ingredients &&
    recipe.required_ingredients.map((i: { name: string }) => {
      if (ing.length < 3) ing.push(i.name);
    });

  return loaded ? (
    <Container>
      <SmallContainer
        onClick={() => {
          const themeId = recipe.theme;
          router.push(
            {
              pathname: `/videoPlayer/${recipe.id}/${themeId}`,
              query: { themeId },
            },
            `/videoPlayer/${recipe.id}/${themeId}`,
          );
        }}
        img={loaded}>
        <Content>
          <UseSave id={recipe.id} type={'Recipes'} />
        </Content>
      </SmallContainer>
      <Description>
        <Title css={FONT.BODY_2}>{recipe.title}</Title>
        <Text css={FONT.DETAIL_2}>
          <ClockIcon />
          {recipe.time_taken}
        </Text>
        {route ? (
          <Text css={FONT.DETAIL_2}>
            <IconFix>
              <SaladIcon />
            </IconFix>
            {ing.join(' • ')}
          </Text>
        ) : (
          <></>
        )}
      </Description>
    </Container>
  ) : (
    <SkeletonSmall />
  );
};

export const ImgCardBig = (props: Themes) => {
  const router = useRouter();
  const loaded = useImage(props.portrait_image);

  return loaded ? (
    <Container>
      <BigContainer
        imgProps={loaded}
        onClick={() => {
          router.push(`/theme/${props.id}`);
        }}>
        <Content>
          <Title css={FONT.FOODTITLE}>{props.title}</Title>
          <SubTitle css={FONT.DETAIL_2}>
            {props.duration}일 식단 ∙ {props.recipe_count}개의 레시피
            <UseSave id={props.id} type={'Themes'} />
          </SubTitle>
        </Content>
      </BigContainer>
    </Container>
  ) : (
    <SkeletonBig />
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BigContainer = styled.div<{ imgProps: string }>`
  width: 100%;
  padding: calc(424 / 327 * 100%) 22px 22px 22px;

  border-radius: 1rem;

  background-image: linear-gradient(to top, #1c1c1c 1.09%, rgba(18, 18, 18, 0) 65.65%),
    url(${(props) => props.imgProps});
  background-size: cover;
  background-position: center;
`;

const SmallContainer = styled.div<{ img: string }>`
  width: 100%;
  min-width: 150px;

  padding: calc(230 / 158 * 100%) 12px 12px 0;
  border-radius: 1rem;
  background-image: linear-gradient(to top, rgba(36, 36, 36, 0.4) 0%, rgba(36, 36, 36, 0) 52.08%),
    url(${(props) => props.img});
  background-size: cover;
`;

const MediumContainer = styled.div<{ img: string }>`
  width: 100%;

  padding: calc(156 / 327 * 100%) 22px 22px 22px;
  border-radius: 1rem;

  cursor: pointer;
  background-image: linear-gradient(to top, #1c1c1c 1.09%, rgba(18, 18, 18, 0) 65.65%), url(${(props) => props.img});
  background-size: cover;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  color: ${COLOR.PRIMARY_WHITE};
`;

const Title = styled.div`
  width: 100%;
`;

const SubTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  z-index: 1;
`;

const Description = styled.div`
  width: 100%;
  padding-top: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Text = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;

  word-wrap: break-word;
  word-break: keep-all;
`;

const IconFix = styled.div``;
