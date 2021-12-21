import Link from 'next/link';
import MarqueeWrap from "react-fast-marquee";
import styled, { keyframes } from "styled-components"

const flashingAnim = keyframes`
  0% { background: hsla(360, 100%, 50%, 1); }
  100% { background: hsla(360, 100%, 50%, 0); }
`

const FlashingText = styled.span`
  margin: 0 2rem;
  display: inline-block;
  animation-name: ${flashingAnim};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;

const Marquee = () => {
  const marqueeItems = [
    {
      path: '/articles/monkey-attack',
      text: 'Breaking! A monkey attack on the internet'
    },
    {
      path: '/articles/smelly-foot-breakout',
      text: 'Smelly foot breakout in the new Mars colony'
    },
  ];

  return (
      <MarqueeWrap gradient={false}>
        {marqueeItems.map(({ path, text }, index) => (
          <Link href={path} key={index}>
            <FlashingText>{text}</FlashingText>
          </Link>
        ))}
      </MarqueeWrap>
  );
};

export default Marquee;
