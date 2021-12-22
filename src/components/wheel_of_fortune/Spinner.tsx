import { random } from '@/utils/math';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Wheel, { Item } from './Wheel';

type Props = {
  items: Item[];
  onSpinCompleted: (result: Item) => void;
  revolutionPerSecond?: number;
}

const Wrap = styled.div`
  background: #fff;
`;
const WheelWrap = styled.div`
  position: relative;
  max-width: 500px;
  max-height: 500px;
  padding: 2rem;
`;
const PointerWrap = styled.div`
  position: absolute;
  top: 0;
  right: 50%;
  color: #000;
  font-size: 50px;
  transform: translateX(15px);
  z-index: 5;
`;
const Button = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10%;
  height: 10%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 2;
  &:disabled {
    opacity: 1;
    background: #fff;
    cursor: default;
  }
`;
const WheelAnimation = styled.div<{duration: number, rotation: number}>`
  border: 2px solid #000;
  box-shadow: 0px 5px 10px #000;
  line-height: 0%;
  border-radius: 50%;
  transform: rotate(${props => props.rotation}deg);
  transition: transform ${props => props.duration}s cubic-bezier(0.33, 1, 0.68, 1);
`;
const Label = styled.div`
  color: black;
`;

const Spinner = ({ items, onSpinCompleted, revolutionPerSecond = 1 }: Props) => {
  const [anim, setAnim] = useState({rotation: 0, duration: 0});
  const [isSpinning, setIsSpinning] = useState(false);

  const getWinnerData = (rotation: number) => {
    const winnerIndex = Math.floor(rotation % 360 / (360 / items.length));
    const winner = items[winnerIndex];
    return winner;
  }

  const startSpin = () => {
    if (isSpinning) return;
    const duration = random(4, 8);
    setIsSpinning(true);
    setAnim({duration, rotation: anim.rotation + 360 * revolutionPerSecond});
  }

  useEffect(() => {
    if (!isSpinning) return;
    const interval = setTimeout(() => {
      onSpinCompleted(getWinnerData(anim.rotation));
    }, anim.duration * 1000);
    return () => clearInterval(interval);
  }, [isSpinning])

  // Todo: add draggable wheel

  return (
    <Wrap>
      <WheelWrap>
        <PointerWrap>
          <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
        </PointerWrap>
        <Button onClick={() => startSpin()} disabled={isSpinning}>SPIN!</Button>
        <WheelAnimation duration={anim.duration} rotation={anim.rotation}>
          <Wheel items={items} />
        </WheelAnimation>
      </WheelWrap>
      <Label>Win some stuff! Eyooooo, let it spin!!!</Label>
    </Wrap>
  )
}

export default Spinner;
