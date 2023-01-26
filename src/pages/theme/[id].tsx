import { useQuery } from 'react-query';
import { accessApi } from '../../api/api';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { useEffect, useState } from 'react';
import FONT from '../../constants/fonts';
import COLOR from '../../constants/theme';
import { GoBackIcon } from '../../components/icons/BtnIcons';
import PATH from '../../constants/path';
import { ShowCount } from '../../components/icons/ShowCount';
import { Calender, Rice, Time } from '../../components/icons/ThemeIcons';
import { ImgCardSmall } from '../../components/imgProps/imgcard';

export default function allTheme(props: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const listenScrollEvent = (e: any) => {
      console.log(e.srcElement.scrollTop);
      console.log('e');

      console.log(document.documentElement.scrollTop);
      e.srcElement.scrollTop > 10 ? setHead(true) : setHead(false);
      console.log(window.pageYOffset);
      console.log(document.body.scrollTop);
    };

    console.log(document.body);

    document.body.addEventListener('scroll', listenScrollEvent, { capture: true });
    return () => {
      if (typeof window !== 'undefined') {
        document.body.removeEventListener('scroll', listenScrollEvent);
        console.log('a');
      }
    };
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getRecipes = async () => {
    console.log(router.query.id);
    const res = await accessApi.get(`/theme/${router.query.id}`);
    console.log(res);
    return res.data;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [head, setHead] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { push } = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, isLoading } = useQuery('Recipes', getRecipes);

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading....</div>;
  console.log(data);

  interface Themes {
    id: number;
    title: string;
    description: string;
    recipe_count: number;
    duration: number;
    tips: string;
    theme_type: number;
    recipes: [];
  }

  console.log(data.theme);
  const curTheme = data.theme;
  const curRecipes = curTheme.recipes;
  console.log(curRecipes);
  console.log(curTheme.tips);

  return (
    <>
      <Container>
        <Top_Navigation>
          <Column>
            <GoBackIcon
              color={COLOR.TYPEFACE_BLACK}
              onClick={() => {
                push(PATH.HOME);
              }}
            />
            {head && <HeadText css={FONT.BUTTON}>{head === true ? curTheme.title : null}</HeadText>}
            <Save>
              <ShowCount></ShowCount>
              <Num>{curTheme.save_count}</Num>
            </Save>
          </Column>
        </Top_Navigation>

        {data && (
          <>
            <Heading>
              <Text1 css={FONT.DETAIL_2}>
                {data.theme_type_name}
                <br />
              </Text1>
              <Text css={FONT.HEADING}>{curTheme.title}</Text>
            </Heading>
            <Description css={FONT.BODY_2_3}>{curTheme.description}</Description>
            <Emoticon>
              <Calender />
              <Small css={FONT.BODY_2_2}>{curTheme.recipe_count}일 식단</Small>
              <Rice />
              <Small css={FONT.BODY_2_2}>{curTheme.duration}개 레시피</Small>
            </Emoticon>
            <AllRecipes>
              {curRecipes.map((recipes: any) => {
                return <ImgCardSmall key={recipes.id} {...recipes} route={false} />;
              })}
            </AllRecipes>
          </>
        )}
        <EasyTips>
          <Img src={curTheme.tips} alt="" />
        </EasyTips>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const Small = styled.div`
  padding-left: 8px;
  padding-right: 12px;
`;
const Save = styled.div`
  display: flex;
  flex-direction: column;
  //width: 100%;
  height: 43;
  justify-content: center;
  align-items: center;
  //width: 100%;
  text-align: right;
  //padding-right: 24px;
`;
const Num = styled.div``;
const HeadText = styled.div`
  //width: 100%;
  //padding-left: 10px;
  margin-top: 2px;
  color: ${COLOR.TYPEFACE_BLACK};
`;

const Top_Navigation = styled.div`
  width: 100%;
  height: 100px;
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
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 21px;
  padding-top: 55px;
  //padding-right: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  //position: fixed;
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
  width: 100%;
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
`;

const Heading = styled.div`
  margin-bottom: 8px;
  color: ${COLOR.TYPEFACE_BLACK};
`;
const Description = styled.div`
  margin-bottom: 40px;
  color: ${COLOR.TYPEFACE_GRAY1};
`;
const Emoticon = styled.div`
  margin-bottom: 8px;
  color: black;
  display: flex;
  flex-direction: row;
`;
