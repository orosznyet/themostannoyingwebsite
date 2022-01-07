import { useAppSelector } from "@/redux/hooks";
import { selectDarkMode } from "@/redux/stores/preference";
import { createGlobalStyle } from "styled-components"

// Using styled-components provided theme is great and all but I'm losing
// in-browser variable modifications. It's easy to get the current OS
// theme but when it comes down to user defined in-browser dark mode,
// the story changes quickly.
// So, even though this is not the perfect solution, it works fine.

// For more info:
// https://material.io/design/color/the-color-system.html#color-theme-creation

const breakpoints = {
  xs: "0",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px"
}

const cssRulePrefix = '@media screen and';
const cssRuleMinMax =
  (min: string, max: string) => `(min-width: ${min}) and (max-width: ${max})`;
export const cssRule = {
  // Strictly targeted dimensions
  xs: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.xs, breakpoints.sm)}`,
  sm: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.sm, breakpoints.md)}`,
  md: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.md, breakpoints.lg)}`,
  lg: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.lg, breakpoints.xl)}`,
  xl: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.xl, breakpoints.xxl)}`,
  xxl: `${cssRulePrefix} (min-width: ${breakpoints.xxl})`,
  // Targeting without uppper limit
  xsUp: `${cssRulePrefix} (min-width: ${breakpoints.xs})`,
  smUp: `${cssRulePrefix} (min-width: ${breakpoints.sm})`,
  mdUp: `${cssRulePrefix} (min-width: ${breakpoints.md})`,
  lgUp: `${cssRulePrefix} (min-width: ${breakpoints.lg})`,
  xlUp: `${cssRulePrefix} (min-width: ${breakpoints.xl})`,
  xxlUp: `${cssRulePrefix} (min-width: ${breakpoints.xxl})`,
  // Targeting without lower limit
  xsDown: `${cssRulePrefix} (max-width: ${breakpoints.sm})`,
  smDown: `${cssRulePrefix} (max-width: ${breakpoints.md})`,
  mdDown: `${cssRulePrefix} (max-width: ${breakpoints.lg})`,
  lgDown: `${cssRulePrefix} (max-width: ${breakpoints.xl})`,
  xlDown: `${cssRulePrefix} (max-width: ${breakpoints.xxl})`,
  xxlDown: `${cssRulePrefix}`,
}

const DarkTheme = createGlobalStyle`
  :root {
    --color-background: #050416;
    --color-primary: #00bcd4;
    --color-primary-alt: #00acc1;
    --color-secondary: #ffc107;
    --color-secondary-alt: #ffb300;
    --color-tertiary: #ff5722;
    --color-tertiary-alt: #ff5722;
    --color-surface: #141221;;
    --color-error: #f44336;
    --color-on-primary: #ffffff;
    --color-on-secondary: #000000;
    --color-on-tertiary: #000000;
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
    --color-on-tertiary: #050416;
    --color-on-background: #050416;
    --color-on-surface: #050416;
    --color-on-error: #050416;
    --color-dimmer: #3a3a3abc;
  }
`;

// We get the benefits of the styled-components but also have runtime
// css variable capabilities.
export const cssVars = {
  color: {
    background: 'var(--color-background)',
    primary: 'var(--color-primary)',
    primaryAlt: 'var(--color-primary-alt)',
    secondary: 'var(--color-secondary)',
    secondaryAlt: 'var(--color-secondary-alt)',
    tertiary: 'var(--color-tertiary)',
    tertiaryAlt: 'var(--color-tertiary-alt)',
    surface: 'var(--color-surface)',
    error: 'var(--color-error)',
    onPrimary: 'var(--color-on-primary)',
    onSecondary: 'var(--color-on-secondary)',
    onTertiary: 'var(--color-on-tertiary)',
    onBackground: 'var(--color-on-background)',
    onSurface: 'var(--color-on-surface)',
    onError: 'var(--color-on-error)',
    dimmer: 'var(--color-dimmer)',
  },
  fontFamily: {
    primary: 'var(--font-family)',
    secondary: 'var(--header-font-family)',
  },
  fontSize: {
    small: 'var(--font-size-small)',
    normal: 'var(--font-size-normal)',
    large: 'var(--font-size-large)',
    headline: 'var(--font-size-headline)',
    title: 'var(--font-size-title)',
  },
  spacing: {
    gap: 'var(--gap)',
    gap2x: 'calc(var(--gap) * 2)',
    container: '1200px'
  },
}

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
