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
  height: 500px;
  background: ${cssVars.color.background};
`;

const items: Item[] = [
  {color: 'red', text: '#1'},
  {color: 'blue', text: '#2'},
  {color: 'green', text: '#3'},
  {color: 'yellow', text: '#4'},
  {color: 'orange', text: '#5'},
  {color: 'purple', text: '#6'},
  {color: 'pink', text: '#7'},
  {color: 'brown', text: '#8'},
  {color: 'black', text: '#9'},
  {color: 'grey', text: '#10'},
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
