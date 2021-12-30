import styled from "styled-components";
import { cssVars } from "../master/Theme";

export const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: ${cssVars.spacing.gap} 0;
  padding: 0;
  gap: ${cssVars.spacing.gap};
  list-style: none;
  font-size: ${cssVars.fontSize.large};
`;
export const MenuItem = styled.li``;
