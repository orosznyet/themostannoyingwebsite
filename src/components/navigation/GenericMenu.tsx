import { ClearListStyle } from "@/utils/styles";
import styled from "styled-components";
import { cssVars } from "../master/Theme";

export const Menu = styled.ul`
  ${ClearListStyle}
  display: flex;
  flex-wrap: wrap;
  margin: ${cssVars.spacing.gap} 0;
  gap: ${cssVars.spacing.gap};
  font-size: ${cssVars.fontSize.large};
`;
export const MenuItem = styled.li``;
