import { useEffect } from "react";
import styled from "styled-components";
import { cssVars } from "../master/Theme";

export type Props = {
  children: React.ReactChild,
  show: boolean,
  handleClose: () => void,
  closeOnEsc?: boolean,
  closeOnClickOutside?: boolean,
}

const Dimmer = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: ${cssVars.color.dimmer};
  padding: ${cssVars.spacing.gap2x} ${cssVars.spacing.gap};
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s, visibility 0.3s;
  &.modal-show {
    opacity: 1;
    visibility: visible;
  }
  &.modal-hide {
    opacity: 0;
    visibility: hidden;
  }
`;

/**
 * Provides a modal window that can be used to display any type of content.
 * Please note that unlike ActionModal, you'll have to prevent click propagation
 * when using clickOutside.
 */
const GenericModal = ({
  children,
  show,
  handleClose,
  closeOnEsc = true,
  closeOnClickOutside = true,
}: Props) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (closeOnEsc && e.key === "Escape") {
      handleClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [])

  return (
    <Dimmer
      className={show ? 'modal-show' : 'modal-hide'}
      onClick={() => closeOnClickOutside ? handleClose() : null}
      >
      {children}
    </Dimmer>
  );
}

export default GenericModal;
