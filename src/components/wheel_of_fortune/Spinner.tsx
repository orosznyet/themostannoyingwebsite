import { useAppSelector } from '@/redux/hooks';
import { selectEnableFlashing } from '@/redux/stores/consent';
import { random } from '@/utils/math';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { cssVars } from '../master/Theme';
import Wheel, { Item } from './Wheel';

type Props = {
  items: Item[];
  onSpinCompleted: (result: Item) => void;
  revDuration?: number;
  revRange?: [number, number]
}

const SliceFlashing = keyframes`
  0% { filter: invert(0); }
  50% { filter: invert(0.5); }
  100% { filter: invert(0); }
`;
const Wrap = styled.div`
  background: ${cssVars.color.surface};
  color: ${cssVars.color.onSurface};
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
  z-index: 1;
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
  z-index: 1;
  &:disabled {
    opacity: 1;
    background: #fff;
    cursor: default;
  }
`;
const WheelAnimationWrap = styled.div`
  border: 2px solid #000;
  box-shadow: 0px 5px 10px #000;
  line-height: 0%;
  border-radius: 50%;
`;
const WheelAnimation = styled.div<{
  duration: number,
  rotation: number,
  allowFlashing: boolean,
}>`
  transform: rotate(${props => props.rotation}deg);
  transition: transform ${props => props.duration}s cubic-bezier(0.33, 1, 0.68, 1);
  .slice-winner {
    animation: ${SliceFlashing} 500ms infinite;
    ${props => !props.allowFlashing && css`animation: none;`}
  }
`;
const Label = styled.div`
  color: ${cssVars.color.onSurface};
  text-align: center;
  font-size: ${cssVars.fontSize.title};
  padding: ${cssVars.spacing.gap2x};
  padding-top: 0;
`;

export type SpinnerState = 'ready' | 'spinning' | 'completed';

const Spinner = ({
  items,
  onSpinCompleted,
  revDuration = 4,
  revRange = [2, 6],
}: Props) => {
  const flashing = useAppSelector(selectEnableFlashing);
  const [anim, setAnim] = useState({ rotation: 0, duration: 0 });
  const [state, setState] = useState<SpinnerState>('ready');
  const [winIndex, setWinIndex] = useState<number | undefined>(undefined);
  const degPerItem = 360 / items.length;

  const getWinnerIndex = () => {
    const modulo = (anim.rotation + 270) % 360;
    return Math.floor(modulo / degPerItem);
  }

  const startSpin = () => {
    if (state != 'ready') return;
    const dir = anim.rotation < 0 ? -1 : 1;
    const revs = random(revRange[0], revRange[1]);
    const revDeg = 360 * revs * dir;
    const winIndex = random(0, items.length - 1);
    const winDeg = (270 - (degPerItem / 2) - (degPerItem * winIndex)) * dir;

    setState('spinning');
    setWinIndex(winIndex);
    setAnim({
      duration: revDuration,
      rotation: anim.rotation + revDeg + winDeg,
    });
  }

  useEffect(() => {
    if (state !== 'spinning') return;
    const interval = setTimeout(() => {
      setState('completed');
      onSpinCompleted(items[getWinnerIndex()]);
    }, anim.duration * 1000);
    return () => clearInterval(interval);
  }, [state])

  // Todo: add draggable wheel

  return (
    <Wrap>
      <WheelWrap>
        <PointerWrap>
          <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
        </PointerWrap>
        <Button onClick={() => startSpin()} disabled={state !== 'ready'}>SPIN!</Button>
        <WheelAnimationWrap>
          <WheelAnimation
            duration={anim.duration}
            rotation={anim.rotation}
            allowFlashing={flashing}
          >
            <Wheel
              items={items}
              highlightIndex={state === 'completed' ? winIndex : undefined}
            />
          </WheelAnimation>
        </WheelAnimationWrap>
      </WheelWrap>
      <Label>Win some stuff! Eyooooo, let it spin!!!</Label>
    </Wrap>
  )
}

export default Spinner;
