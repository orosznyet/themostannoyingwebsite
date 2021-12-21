import styled from 'styled-components';
import DarkModeToggle from '../DarkModeToggle';
import Marquee from '../navigation/Marquee';
import MainMenu from '../navigation/MainNavigation';

const Title = styled.h1`
  margin: 0;
`;

const Header = () => {
  return (
    <header>
      <Title>
        The <i>MAW</i>
      </Title>
      <DarkModeToggle />
      <MainMenu />
      <Marquee />
    </header>
  );
};

export default Header;
