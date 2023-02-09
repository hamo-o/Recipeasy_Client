import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import FONT from '../../constants/fonts';
import COLOR from '../../constants/theme';
import { GoBackIcon } from '../../components/icons/BtnIcons';
import { Calender, Rice, Time } from '../../components/icons/ThemeIcons';
import { ImgCardSmall } from '../../components/common/img_props/imgcard';
import { GetServerSideProps } from 'next';
import { UseSave } from '../../hooks/useSave';
import { themeAPI } from '../../api/themeAPI';
import Loading from '../../components/loading';
import { Recipes } from '../../interfaces/main';

export default function AllTheme(props: string) {
  useEffect(() => {
    const listenScrollEvent = (e: Event) => {
      (e.target as HTMLElement).scrollTop > 10 ? setHead(true) : setHead(false);
    };

    document.body.addEventListener('scroll', listenScrollEvent, { capture: true });
    return () => {
      if (typeof window !== 'undefined') {
        document.body.removeEventListener('scroll', listenScrollEvent);
      }
    };
  }, []);

  const router = useRouter();
  const [head, setHead] = useState(false);

  const { data, error, isLoading } = useQuery(['Recipes', router.query.id], () =>
    themeAPI.getTheme(Number(router.query.id)),
  );

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <Loading />;

  const curTheme = data.theme;
  const curRecipes = curTheme?.recipes;

  return (
    <>
      <Container>
        <Top_Navigation>
          <Column>
            <GoBackIcon
              color={COLOR.TYPEFACE_BLACK}
              onClick={() => {
                router.back();
              }}
            />
            {head && <HeadText css={FONT.BUTTON}>{head === true ? curTheme.title : null}</HeadText>}
            <Save>
              <UseSave id={curTheme?.id} type="Themes" />
              <Num css={FONT.DETAIL_1}>{curTheme?.save_count}</Num>
            </Save>
          </Column>
        </Top_Navigation>

        {data && (
          <>
            <Heading>
              <Text1 css={FONT.DETAIL_2}>
                {data?.theme_type_name}
                <br />
              </Text1>
              <Text css={FONT.HEADING}>{curTheme?.title}</Text>
            </Heading>
            <Description css={FONT.BODY_2_3}>{curTheme?.description}</Description>
            <Emoticon>
              <Calender />
              <Small css={FONT.BODY_2_2}>
                {curTheme?.recipe_count}
                <Inner css={FONT.BODY_2_2}>일 식단</Inner>
              </Small>
              <Rice />
              <Small css={FONT.BODY_2_2}>
                {curTheme?.duration}
                <Inner css={FONT.BODY_2_2}>개 레시피</Inner>
              </Small>
            </Emoticon>
            <AllRecipes>
              {curRecipes?.map((recipes: Recipes) => {
                return <ImgCardSmall key={recipes.id} recipe={recipes} route={true} />;
              })}
            </AllRecipes>
          </>
        )}
        <EasyTips>
          <Img src={curTheme?.tips} alt="" />
        </EasyTips>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};
const Wrap = styled.div``;
const Inner = styled.div`
  margin-top: 0.5px;

  padding-right: 12px;
`;
const Small = styled.div`
  padding-top: 3px;
  padding-left: 8px;
  padding-right: 12px;
  display: flex;
  flex-direction: row;
`;
const Save = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: right;
`;
const Num = styled.div``;
const HeadText = styled.div`
  margin-top: 2px;
  color: ${COLOR.TYPEFACE_BLACK};
`;

const Top_Navigation = styled.div`
  width: 100%;
  // height: 100px;
  transition: 'all 1s';
  position: sticky;
  top: 0px;
  display: flex;
  background: ${COLOR.PRIMARY_WHITE_85};
  z-index: 1;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-direction: row;
  backdrop-filter: blur(10px);
  padding-left: 24px;
  padding-right: 24px;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  //padding-bottom: 21px;
  padding-top: 25px;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

const Text1 = styled.div`
  color: ${COLOR.TYPEFACE_GRAY2};
`;

const Text = styled.div`
  color: ${COLOR.TYPEFACE_BLACK};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EasyTips = styled.div`
  width: 100%;
  max-height: 420px;
`;
const Container = styled.div`
  width: 100vw;
  max-width: 450px;
  height: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AllRecipes = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  gap: 0.75rem;
  padding-bottom: 54px;
  padding-left: 24px;
`;

const Heading = styled.div`
  margin-bottom: 8px;
  color: ${COLOR.TYPEFACE_BLACK};
  padding-left: 24px;
  padding-right: 24px;
`;
const Description = styled.div`
  margin-bottom: 40px;
  color: ${COLOR.TYPEFACE_GRAY1};
  padding-left: 24px;
  padding-right: 24px;
  white-space: pre-wrap;
`;
const Emoticon = styled.div`
  margin-bottom: 8px;
  padding-left: 24px;
  padding-right: 24px;
  color: black;
  display: flex;
  flex-direction: row;
`;
