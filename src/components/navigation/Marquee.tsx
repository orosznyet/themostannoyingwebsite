import { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { selectEnableFlashing } from '@/redux/stores/preference';
import ArticleService from '@/services/ArticleService';
import MarqueePlugin from "react-fast-marquee";
import styled, { keyframes } from "styled-components"
import { cssVars } from '../master/Theme';

type Props = {
  className?: string;
}

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
  z-index: 1;
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

const Marquee = ({ className }: Props) => {
  const flashing = useAppSelector(selectEnableFlashing);
  const [items] = useState(ArticleService.getAllFiltered({isHighlighted: true}));

  return (
    <Wrap className={className}>
      <MarqueePlugin gradient={false} speed={100}>
        {items.map(({ slug, title }, index) => {
          const path = '/articles/' + slug;
          return <Link href={path} key={index} passHref>
            <LinkText highlight flashing={flashing}>
              {title}
            </LinkText>
          </Link>
        })}
      </MarqueePlugin>
    </Wrap>
  );
};

export default Marquee;
