import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string;

    colors: {
      main: string;
      mainDark: string;
      secondary: string;
      secondaryDark: string;
    };

    media: {
      _: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
