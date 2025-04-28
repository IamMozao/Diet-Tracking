import 'react-native-magnus';

declare module 'react-native-magnus' {
  export interface ThemeType {
    palette: {
      primary: Record<`${100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`, string>;
      accent: Record<`${100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`, string>;
      textOnPrimary:string;
      success: Record<`${100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`, string>;
      info: Record<`${100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`, string>;
      warning: Record<`${100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`, string>;
      danger: Record<`${100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`, string>;
    };
  }
}
