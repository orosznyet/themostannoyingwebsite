import React, { useRef, useState } from "react";
import styled from "styled-components";
import EscapingElement from "./EscapingElement";

type Props = {
  children: React.ReactNode;
  initialMaxHeight: number;
  steps?: number;
}

const Wrap = styled.div<{maxHeight: number}>`
  position: relative;
  max-height: ${({maxHeight}) => maxHeight || 0}px;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
`

const Overlay = styled.div<{isHidden: boolean}>`
  position: absolute;
  bottom: ${({isHidden}) => isHidden ? -500 : 0}px;
  opacity: ${({isHidden}) => isHidden ? 0 : 1};
  left: 0;
  width: 100%;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
  border: 0.5rem solid #000;
  transition: all 0.3s ease-in-out;
`;

const PaymentButton = styled.button`
  cursor: pointer;
  background: red;
`;

const RevealButton = styled.button`
  cursor: pointer;
  font-size: 0.7rem;
`;

const SmallPrint = styled.small`
  display: block;
  font-size: 0.5rem;
  font-style: italic;
`;

const LockedContent = ({ children, initialMaxHeight, steps = 200 }: Props) => {
  const [maxHeight, setMaxHeight] = useState(initialMaxHeight);
  const [isRevealed, setIsRevealed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extends the max-height of the content until there's content to reveal
  const handleRevealClick = () => {
    const newMaxHeight = maxHeight + steps;
    if (contentRef.current && newMaxHeight > contentRef.current.clientHeight) {
      setIsRevealed(true);
    }
    setMaxHeight(newMaxHeight);
  }

  return (
    <Wrap maxHeight={maxHeight}>
      <div ref={contentRef}>
        {children}
      </div>
      <Overlay isHidden={isRevealed}>
        <h1>You gott pay a $0.69/hour with 24 months of commitment in order to see the next paragraph.</h1>
        <EscapingElement boundingBox={{left: 0, bottom: 0}}>
          <PaymentButton>
            Pay! 100% legit and secure*
          </PaymentButton>
        </EscapingElement>
        <RevealButton onClick={handleRevealClick}>
          Naaah, I'm good, give me free stuff
        </RevealButton>
        <SmallPrint>* it might not be as secure and legit but that doesn't matter because you can't actually pay on this website.</SmallPrint>
      </Overlay>
    </Wrap>
  );
}

export default LockedContent
