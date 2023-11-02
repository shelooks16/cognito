import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string;

    colors: {
      main: string;
      mainHover: string;
      secondary: string;
      secondaryHover: string;
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
