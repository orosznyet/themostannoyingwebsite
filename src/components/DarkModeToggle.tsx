import styled from "styled-components";
import { selectDarkMode, setDarkMode } from "@/redux/stores/appearance";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const SelectorOption = styled.span`
  cursor: pointer;
  z-index: 1;
  flex-grow: 1;
  text-align: center;
`;
const InDarkMode = styled(SelectorOption)``;
const InDayMode = styled(SelectorOption)``;

const Toggler = styled.div<{isDarkMode: boolean}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 60px;
  height: 20px;
  user-select: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  &:before {
    content: "";
    position: absolute;
    width: 50%;
    background: #000;
    height: 100%;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
    transform: translateX(${props => (props.isDarkMode ? "0" : "100%")});
  }
`;

const DarkModeToggle = () => {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(selectDarkMode);

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return (
    <Toggler onClick={toggleDarkMode} isDarkMode={isDarkMode}>
      <InDayMode role="img" aria-label="sun">☀️</InDayMode>
      <InDarkMode role="img" aria-label="moon">🌙</InDarkMode>
    </Toggler>
  );
}

export default DarkModeToggle;
