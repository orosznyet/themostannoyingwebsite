import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { cssVars } from "../master/Theme";
import GenericModal from "../modal/GenericModal";
import Spinner from "./Spinner";
import { Item } from "./Wheel";

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
  height: 500px;
  background: ${cssVars.color.background};
`;

const items: Item[] = [
  {color: 'red', text: 'One option'},
  {color: 'blue', text: 'Two option'},
  {color: 'green', text: 'Three option'},
  {color: 'yellow', text: 'Four option'},
  {color: 'orange', text: 'Five option'},
  {color: 'purple', text: 'Six option'},
  {color: 'pink', text: 'Seven option'},
  {color: 'brown', text: 'Eight option'},
  {color: 'black', text: 'Nine option'},
  {color: 'grey', text: 'Ten option'},
];

const ActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <Spinner
            items={items}
            onSpinCompleted={onSpinHandler}
            revolutionPerSecond={2}
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
