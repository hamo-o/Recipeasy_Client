import styled from '@emotion/styled';
import COLOR from '../constants/theme';
import { useRouter } from 'next/router';
import { getCookie } from '../util/cookie';

import { MainLogo } from '../components/icons/LogoIcons';

const LandingPage = () => {
  const router = useRouter();
  const isUser = Boolean(getCookie('accessToken'));
  setTimeout(() => (isUser ? router.push('/home') : router.push('/login')), 2000);
  return <Container></Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 450px;
  background-image: url(img/landing.png);
  background-size: cover;
  background-position: center;
`;

const Img = styled.img``;

export default LandingPage;
