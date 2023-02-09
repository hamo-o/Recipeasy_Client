import { useRef } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from '@emotion/styled';

import { GoBackIcon } from '../../components/icons/BtnIcons';
import { ClockIcon, FilledStarIcon, EmptyStarIcon, NumberIcon, ArrowIcon } from '../../components/icons/BasicIcons';
import { FoodIcon } from '../../components/icons/FoodIcons';
import FONT from '../../constants/fonts';
import COLOR from '../../constants/theme';

import { useQuery } from 'react-query';
import { UseSave } from '../../hooks/useSave';
import { equipment, required, additional, sequence } from '../../interfaces/main';

import { recipeAPI } from '../../api/recipeAPI';
import Loading from '../../components/loading';

const Recipe = (id: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const one = useRef<HTMLDivElement>(null);
  const two = useRef<HTMLDivElement>(null);
  const three = useRef<HTMLDivElement>(null);
  const four = useRef<HTMLDivElement>(null);
  const five = useRef<HTMLDivElement>(null);

  const refArr = [one, two, three, four, five];
  const topRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery(['Recipes', id.params], () => recipeAPI.getRecipe(id.params));

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <Loading />;

  const curRecipe = data;

  const stars = () => {
    let arr = [];
    for (let i = 0; i < curRecipe?.difficulty; i++) {
      arr.push(i);
    }
    return arr;
  };

  const handleClickScroll = (index: number) => {
    refArr[index].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Container>
      <TopBar>
        <IconWrapper>
          <GoBackIcon onClick={() => router.back()} color={COLOR.TYPEFACE_BLACK} />
          <Save>
            <UseSave id={curRecipe?.id} type="Recipes" />
            <div css={FONT.DETAIL_1}>{curRecipe.save_count}</div>
          </Save>
        </IconWrapper>
        <Title css={FONT.FOODTITLE}>{curRecipe?.title}</Title>
        <Subtitle css={FONT.BODY_2_3}>{curRecipe?.description}</Subtitle>
        <Cards>
          <Card>
            <Text css={FONT.DETAIL_2}>난이도</Text>
            <Icons>
              {stars().map((idx) => (
                <FilledStarIcon key={idx} />
              ))}
              {[0, 1, 2, 3, 4]
                .filter((idx) => !stars().includes(idx))
                .map((idx) => (
                  <EmptyStarIcon key={idx} />
                ))}
            </Icons>
          </Card>
          <Card>
            <Text css={FONT.DETAIL_2}>소요시간</Text>
            <Icons>
              <ClockIcon />
              {curRecipe?.time_taken}
            </Icons>
          </Card>
        </Cards>
      </TopBar>

      <Contents>
        <Content>
          <Ingredients>
            <Title css={FONT.SUBTITLE_1}>
              필수 재료
              <TagIcon css={FONT.DETAIL_2} onClick={() => router.push(`/calcDetail`)}>
                계량하는 법 보기
              </TagIcon>
            </Title>
            {curRecipe?.required_ingredients?.map((ingredient: required, i: number) => (
              <Ingredient key={i}>
                <FoodName>
                  <FoodIconWrapper>
                    <FoodIcon name={ingredient?.name} />
                  </FoodIconWrapper>
                  <Text css={FONT.BUTTON}>{ingredient?.name}</Text>
                  {ingredient?.substitute ? (
                    <Substitute css={FONT.BODY_2_3}>
                      <ArrowIcon />
                      {ingredient?.substitute}
                    </Substitute>
                  ) : (
                    <></>
                  )}
                </FoodName>
                <Text css={FONT.BODY_1}>{ingredient.quantity}</Text>
              </Ingredient>
            ))}
            <Line />
            <Ingredients>
              <Title css={FONT.SUBTITLE_1}>추가 재료</Title>
              {curRecipe?.additional_ingredients?.map((ingredient: additional, i: number) => (
                <Ingredient key={i}>
                  <Text css={FONT.BUTTON}>{ingredient?.name}</Text>
                  <Text css={FONT.BODY_1}>{ingredient?.quantity}</Text>
                </Ingredient>
              ))}
            </Ingredients>
          </Ingredients>

          <Equipments>
            <Title css={FONT.SUBTITLE_1}>필요 도구</Title>
            <Equipment>
              {curRecipe?.equipment?.map((ingredient: equipment, i: number) => (
                <Tag key={i + 1} css={FONT.BODY_2_3}>
                  {ingredient?.name}
                </Tag>
              ))}
            </Equipment>
            <Bar />
          </Equipments>
        </Content>

        <Content>
          <Recipes>
            <Title css={FONT.SUBTITLE_1}>레시피 요약</Title>
            <Sequences>
              {curRecipe?.recipe_sequence?.map((sequence: sequence) => (
                <Sequence key={sequence?.order} ref={topRef} onClick={() => handleClickScroll(sequence?.order - 1)}>
                  <NumberIcon num={sequence?.order} />
                  <Description css={FONT.BODY_1}>{sequence?.short_desc}</Description>
                </Sequence>
              ))}
            </Sequences>
          </Recipes>
          <Recipes>
            <Title css={FONT.SUBTITLE_1}>레시피 더 자세히 보기</Title>
            <Sequences>
              {curRecipe?.recipe_sequence?.map((sequence: sequence) => (
                <SequenceWrapper key={sequence?.order} ref={refArr[sequence?.order - 1]}>
                  <Sequence onClick={() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                    <NumberIcon num={sequence?.order} />
                    <Description css={FONT.BODY_1}>{sequence?.short_desc}</Description>
                  </Sequence>
                  <Img src={sequence?.image} />
                  <TimeIcon css={FONT.BODY_2_2}>
                    <ClockIcon />
                    {sequence?.time}
                  </TimeIcon>
                  <Text css={FONT.BODY_1}>{sequence?.long_desc}</Text>
                </SequenceWrapper>
              ))}
            </Sequences>
          </Recipes>
        </Content>
      </Contents>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params!.id;
  return {
    props: { params },
  };
};

const Container = styled.div`
  width: 100vw;
  max-width: 450px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  background: ${COLOR.PRIMARY_WHITE};

  overflow: auto;
`;

const Contents = styled.div`
  width: 100%;
`;

const TopBar = styled.div`
  width: 100%;
  height: auto;
  max-width: 450px;

  padding: 0 1.5rem 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: ${COLOR.BG_GRAY1_85};
`;

const Save = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Subtitle = styled.div`
  padding: 1rem 0;
  color: ${COLOR.TYPEFACE_GRAY1};
`;

const Cards = styled.div`
  display: flex;
  gap: 20px;
`;

const Card = styled.div`
  width: 100%;
  padding: 1rem;

  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background: ${COLOR.PRIMARY_WHITE};
`;

const FoodName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FoodIconWrapper = styled.div`
  padding: 5px;

  background: ${COLOR.BG_GRAY1};

  border-radius: 0.5rem;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Substitute = styled.div`
  padding: 0.25rem 0.5rem;

  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  gap: 4px;
  background: ${COLOR.BG_GRAY1};
`;

const Text = styled.div`
  word-break: keep-all;
  word-wrap: break-word;
`;

const Description = styled.div`
  max-width: 70vw;
  word-break: keep-all;
  word-wrap: break-word;
`;

const Content = styled.div`
  width: 100%;
  padding: 20px 24px 0;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: ${COLOR.PRIMARY_WHITE};
`;

const TagIcon = styled.div`
  padding: 5px 10px 4px;

  color: ${COLOR.TYPEFACE_WHITE};
  background: ${COLOR.PRIMARY_ORANGE};

  border-radius: 8px;
`;

const Equipments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Equipment = styled.div`
  display: flex;
  gap: 6px;
`;

const Tag = styled.div`
  padding: 4px 12px;
  color: ${COLOR.TYPEFACE_BLACK};
  background: ${COLOR.BG_GRAY1};
  border-radius: 8px;
`;

const Recipes = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;

  gap: 12px;
`;

const Sequences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SequenceWrapper = styled.div`
  padding-bottom: 2.25rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Sequence = styled.div`
  padding: 14px 13px;

  display: flex;
  align-items: center;
  gap: 1rem;
  flex-basis: 24px;

  border-radius: 12px;

  background: ${COLOR.BG_GRAY1_85};
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 327/226;

  border-radius: 12px;

  object-fit: cover;
`;

const TimeIcon = styled.div`
  width: max-content;
  padding: 0.35rem 0.5rem 0.25rem;

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.5rem;

  border-radius: 0.5rem;

  color: ${COLOR.PRIMARY_ORANGE};
  background: ${COLOR.PRIMARY_ORANGE2};
`;

const Ingredients = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 4px 0;

  background: #e6e6e6;
  border-radius: 1px;
`;

const Bar = styled.div`
  width: 100vw;
  max-width: 450px;
  height: 14px;

  margin-top: 12px;
  margin-bottom: 4px;

  align-self: center;

  background: ${COLOR.BG_GRAY1};
`;

const Ingredient = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

export default Recipe;
