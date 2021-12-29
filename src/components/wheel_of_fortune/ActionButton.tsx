import { getWeightedRandom } from "@/utils/math";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { cssVars } from "../master/Theme";
import GenericModal from "../modal/GenericModal";
import Spinner from "./Spinner";
import { Item } from "./Wheel";

const zIndexBase = 30;

const wiggleAnim = keyframes`
  0% { transform: rotate(0deg); }
  90% { transform: rotate(0deg); }
  92% { transform: rotate(8deg); }
  94% { transform: rotate(-8deg); }
  96% { transform: rotate(8deg); }
  98% { transform: rotate(-8deg); }
  100% { transform: rotate(0deg); }
`
const Wrap = styled.div`
  position: fixed;
  left: 0;
  top: 50%;
  z-index: ${zIndexBase};
`;
const Icon = styled.div`
  padding: 1rem 1rem 1rem 3rem;
  margin-left: -3rem;
  background: ${cssVars.color.error};
  color: ${cssVars.color.onError};
  opacity: 0.8;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  animation-name: ${wiggleAnim};
  animation-duration: 8s;
  animation-iteration-count: infinite;
  &:hover {
    margin-left: -1rem;
    opacity: 1;
  }
`;
const ModalContent = styled.div`
  width: 500px;
  background: ${cssVars.color.surface};
  border-radius: 5px;
`;

const prizeWithWeight = [
  {value: 'Free lifetime beer*', prob: 10},
  {value: 'World peace*', prob: 1},
  {value: 'Absolutelly nothing', prob: 100},
  {value: 'Complimentary otter*', prob: 2},
  {value: 'Fake 70% discount', prob: 50},
]

const getItems = (hueStart: number, hueEnd: number, numItems: number) => {
  const items: Item[] = [];
  const range = [hueStart, hueEnd].sort();
  const step = (range[1] - range[0]) / numItems;
  for (let i = 0; i < numItems; i++) {
    items.push({
      color: `hsl(${range[0] + i * step}, 100%, 50%)`,
      text: getWeightedRandom(prizeWithWeight)!,
    });
  }

  return items;
}

const ActionButton = () => {
  const hueStart = 300; // random(0,360);
  const [isOpen, setIsOpen] = useState(false);
  const [items] = useState(getItems(hueStart, hueStart + 120, 10));

  const onSpinHandler = (result: Item) => {
    console.log('Winner: ', result);
  }

  return (
    <Wrap>
      <GenericModal
        show={isOpen}
        handleClose={() => setIsOpen(false)}
        closeOnClickOutside
        closeOnEsc
      >
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          hidden={!isOpen}
        >
          <Spinner
            items={items}
            onSpinCompleted={onSpinHandler}
          />
        </ModalContent>
      </GenericModal>
      <Icon onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={['fas', 'tags']}/>
      </Icon>
    </Wrap>
  )
}

export default ActionButton;
