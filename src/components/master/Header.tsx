import styled from 'styled-components';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import Marquee from '../navigation/Marquee';
import MainNavigation from '../navigation/MainNavigation';
import UserNavigation from '../navigation/UserNavigation';
import { cssVars } from '@/styles/theme';

const StyledHeader = styled.header`
  display: grid;
  padding: ${cssVars.spacing.gap} 0;
  grid-template: "title    dark-toggle"
                 "main-nav user-nav"
                 "marquee  marquee";
`;
const Title = styled.h1`
  margin: 0;
  grid-area: title;
`;
const StyledDarkModeToggle = styled(DarkModeToggle)`
  grid-area: dark-toggle;
  align-self: center;
  justify-self: right;
`;
const StyledMainNavigation = styled(MainNavigation)`
  grid-area: main-nav;
`;
const StyledUserNavigation = styled(UserNavigation)`
  grid-area: user-nav;
  align-self: center;
  justify-self: right;
`;
const StyledMarquee = styled(Marquee)`
  grid-area: marquee;
  background: ${cssVars.color.surface};
`;

const Header = () => {
  return (
    <StyledHeader>
      <Title>
        <Link href="/">
          <a>The <i>MAW</i></a>
        </Link>
      </Title>
      <StyledDarkModeToggle />
      <StyledMainNavigation />
      <StyledUserNavigation />
      <StyledMarquee />
    </StyledHeader>
  );
};

export default Header;
