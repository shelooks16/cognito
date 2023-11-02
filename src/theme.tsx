import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from 'styled-components';

const breakpoints = {
  _: '0px',
  mobile: '556px',
  tablet: '768px',
  desktop: '1024px',
  desktopXl: '1200px',
};

const theme: DefaultTheme = {
  fontFamily: 'Roboto, sans-serif',
  colors: {
    main: '#9f38e8',
    mainHover: '#7940a3',
    secondary: '#353535',
    secondaryHover: '#353535',
  },
  media: {
    _: `(min-width: ${breakpoints._})`,
    sm: `(min-width: ${breakpoints.mobile})`,
    md: `(min-width: ${breakpoints.tablet})`,
    lg: `(min-width: ${breakpoints.desktop})`,
    xl: `(min-width: ${breakpoints.desktopXl})`,
  },
};

const GlobalStyles = createGlobalStyle`
  html, body {
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 18px;
    margin: 0;
    padding: 0;
  }
`;

export const GlobalThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {children}
    </ThemeProvider>
  );
};
