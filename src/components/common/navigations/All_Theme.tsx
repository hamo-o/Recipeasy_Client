import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import PATH from '../../../constants/path';
import COLOR from '../../../constants/theme';
import { Container } from '../../../interfaces/main';

const menuData = [
  { id: 'menu01', name: '전체보기', path: PATH.HOME },
  { id: 'menu02', name: '테마별보기', path: '/home/showTheme' },
];

export default function Top_navigation() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <>
      <Top_Navigation>
        <Header>
          {menuData.map((menu) => {
            return (
              <li key={menu.id} style={{ display: 'inline', marginRight: '20px' }}>
                <Link href={menu.path} style={{ textDecoration: 'none' }} passHref>
                  <LinkText href={menu.path} pathName={router.pathname}>
                    {menu.name}
                  </LinkText>
                </Link>
              </li>
            );
          })}
        </Header>
      </Top_Navigation>
    </>
  );
}

const LinkText = styled.div<Container>`
  color: ${(props) => (props.href === props.pathName ? 'black' : 'gray')};
  font-size: 20px;
  font-weight: bold;
  text-decoration: ${(props) => (props.href === props.pathName ? 'underline' : 'none')};
  text-underline-offset: ${(props) => (props.href === props.pathName ? '12px' : 'none')};
`;
const Top_Navigation = styled.div`
  width: 100%;
  height: 100px;
  //margin-bottom: 10px;
  position: sticky;
  top: 0px;
  z-index: 1;
  transition: 'all 1s';
  backdrop-filter: blur(10px);
  background: ${COLOR.PRIMARY_WHITE_85};
`;
const Header = styled.div`
  display: flex;
  color: black;
  padding-bottom: 8px;
  padding-top: 57px;
  flex-direction: row;
`;
