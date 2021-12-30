import { useAppSelector } from '@/redux/hooks';
import { selectEnableFlashing } from '@/redux/stores/preference';
import { random } from '@/utils/math';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'
import styled, { css, keyframes } from 'styled-components';
import Button from '../form/Button';
import { cssRule, cssVars } from '../master/Theme';
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
const Wrap = styled.div``;
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
  color: ${cssVars.color.secondary};
  font-size: 50px;
  transform: translateX(15px);
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.4));
  z-index: 1;
  ${cssRule.mdDown} {
    font-size: 30px;
    top: 13px;
    transform: translateX(9px);
  }
`;
const CtaButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10%;
  height: 10%;
  z-index: 1;
  transform: translate(-50%, -50%);
  border: 1px solid ${cssVars.color.secondary};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  ${cssRule.mdDown} {
    width: 30%;
    border-radius: 5px;
  }
`;
const WheelAnimationWrap = styled.div`
  border: 1px solid ${cssVars.color.secondary};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
  line-height: 0%;
  border-radius: 50%;
`;
const WheelAnimation = styled.div<{
  duration: number,
  rotation: number,
  allowFlashing: boolean,
}>`
  transform: rotate(${props => `${props.rotation}deg`});
  transition: transform ${props => `${props.duration}s`} cubic-bezier(0.33, 1, 0.68, 1);
  .slice-winner {
    animation: ${SliceFlashing} 500ms infinite;
    ${props => !props.allowFlashing && css`animation: none;`}
  }
`;
const Label = styled.div`
  color: ${cssVars.color.onSurface};
  text-align: center;
  font-weight: 600;
  font-size: ${cssVars.fontSize.title};
  padding: ${cssVars.spacing.gap2x};
  padding-top: 0;
`;
const ConfettiWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
      onSpinCompleted(items[winIndex!]);
    }, anim.duration * 1000);
    return () => clearInterval(interval);
  }, [state])

  // Todo: add draggable wheel

  return (
    <Wrap>
      {state === 'completed' && <ConfettiWrap>
        <Confetti
          numberOfPieces={100}
          width={500}
          height={500}
        />
      </ConfettiWrap>
      }
      <WheelWrap>
        <PointerWrap>
          <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
        </PointerWrap>
        <CtaButton
          variant="tertiary"
          onClick={() => startSpin()}
          disabled={state !== 'ready'}
        >
          {state === 'ready' ? '🎲' : '🎉'}
        </CtaButton>
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
      {state !== 'completed' &&
        <Label>Let's spin the wheel!!</Label>
      }
      {state === 'completed' &&
        <Label>You won! {items[winIndex!].text}</Label>
      }
    </Wrap>
  )
}

export default Spinner;
