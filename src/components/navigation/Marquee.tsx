import { useAppSelector } from '@/redux/hooks';
import { selectEnableFlashing } from '@/redux/stores/consent';
import Link from 'next/link';
import MarqueePlugin from "react-fast-marquee";
import styled, { keyframes } from "styled-components"
import { cssVars } from '../master/Theme';

const flashingAnim = keyframes`
  0% { background: transparent; }
  25% { background: transparent; }
  30% { background: ${cssVars.color.error}; }
  70% { background: ${cssVars.color.error}; }
  75% { background: transparent; }
  100% { background: transparent; }
`;
const highlightAnim = keyframes`
  from { background: ${cssVars.color.error}; }
  to { background: ${cssVars.color.error}; }
`;
const Wrap = styled.div`
  font-size: ${cssVars.fontSize.large};
`;
const LinkText = styled.a<{ highlight: boolean, flashing: boolean }>`
  margin: 0 2rem;
  display: inline-block;
  color: ${cssVars.color.background};
  animation-name: ${({ highlight, flashing }) =>
    highlight ? (flashing ? flashingAnim : highlightAnim) : ''
  };
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const marqueeItems = [
  {
    path: '/articles/monkey-attack',
    text: 'Breaking! A monkey attack on the internet',
    highlight: true
  },
  {
    path: '/articles/smelly-foot-breakout',
    text: 'Smelly foot breakout in the new Mars colony',
    highlight: false
  },
];

const Marquee = () => {
  const flashing = useAppSelector(selectEnableFlashing);

  return (
    <Wrap>
      <MarqueePlugin gradient={false}>
        {marqueeItems.map(({ path, text, highlight }, index) => (
          <Link href={path} key={index} passHref>
            <LinkText highlight={highlight} flashing={flashing}>
              {text}
            </LinkText>
          </Link>
        ))}
      </MarqueePlugin>
    </Wrap>
  );
};

export default Marquee;
