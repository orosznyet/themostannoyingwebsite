import { useAppSelector } from "@/app/hooks";
import { selectDarkMode } from "@/features/appearance";
import { createGlobalStyle } from "styled-components"

// Using styled-components provided theme is great and all but I'm losing
// in-browser variable modifications. It's easy to get the current OS
// theme but when it comes down to user defined in-browser dark mode,
// the story changes quickly.
// So, even though this is not the perfect solution, it works fine.

const DarkTheme = createGlobalStyle`
  :root {
    --color-background: #001328;
    --color-text: #fefefe;
    --color-link: #7e16d3;
  }
`;

const LightTheme = createGlobalStyle`
  :root {
    --color-background: #fefefe;
    --color-text: #001328;
    --color-link: #7e16d3;
  }
`;

type Props = {
  children: React.ReactNode
}

const Theme = ({ children }: Props) => {
  const isDarkMode = useAppSelector(selectDarkMode);

  return <>
    {isDarkMode && <DarkTheme />}
    {!isDarkMode &&<LightTheme />}
    {children}
  </>
}

export default Theme
