import styled from 'styled-components';
import DarkModeToggle from '../DarkModeToggle';
import Marquee from '../navigation/Marquee';
import MainMenu from '../navigation/MainNavigation';
import Link from 'next/link';

const Title = styled.h1`
  margin: 0;
`;

const Header = () => {
  return (
    <header>
      <Link href="/">
        <Title><a>The <i>MAW</i></a></Title>
      </Link>
      <DarkModeToggle />
      <MainMenu />
      <Marquee />
    </header>
  );
};

export default Header;
