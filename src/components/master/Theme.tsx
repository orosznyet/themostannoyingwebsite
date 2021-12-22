import { useAppSelector } from "@/redux/hooks";
import { selectDarkMode } from "@/redux/stores/appearance";
import { createGlobalStyle } from "styled-components"

// Using styled-components provided theme is great and all but I'm losing
// in-browser variable modifications. It's easy to get the current OS
// theme but when it comes down to user defined in-browser dark mode,
// the story changes quickly.
// So, even though this is not the perfect solution, it works fine.

// For more info:
// https://material.io/design/color/the-color-system.html#color-theme-creation

const DarkTheme = createGlobalStyle`
  :root {
    --color-background: #050416;
    --color-primary: #00bcd4;
    --color-primary-alt: #00acc1;
    --color-secondary: #ffc107;
    --color-secondary-alt: #ffb300;
    --color-tertiary: #ff5722;
    --color-tertiary-alt: #ff5722;
    --color-surface: #424242;
    --color-error: #f44336;
    --color-on-primary: #ffffff;
    --color-on-secondary: #000000;
    --color-on-background: #fff;
    --color-on-surface: #fff;
    --color-on-error: #fff;
    --color-dimmer: #464646b5;
  }
`;

const LightTheme = createGlobalStyle`
  :root {
    --color-background: #fafafa;
    --color-primary: #00b0c0;
    --color-primary-alt: #028aa5;
    --color-secondary: #991199;
    --color-secondary-alt: #660159;
    --color-tertiary: #ee4917;
    --color-tertiary-alt: #d33d0f;
    --color-surface: #f3f5ec;
    --color-error: #f44034;
    --color-on-primary: #fff;
    --color-on-secondary: #050416;
    --color-on-background: #050416;
    --color-on-surface: #050416;
    --color-on-error: #050416;
    --color-dimmer: #3a3a3abc;
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
