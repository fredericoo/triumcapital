import { Global, css } from '@emotion/react';

const Fonts: React.FC = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'roobert';
        src: url('/fonts/roobert/roobert-light-webfont.woff2') format('woff2'),
          url('/fonts/roobert/roobert-light-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: 'roobert';
        src: url('/fonts/roobert/roobert-lightitalic-webfont.woff2') format('woff2'),
          url('/fonts/roobert/roobert-lightitalic-webfont.woff') format('woff');
        font-weight: normal;
        font-style: italic;
      }

      @font-face {
        font-family: 'roobert';
        src: url('/fonts/roobert/roobert-bold-webfont.woff2') format('woff2'),
          url('/fonts/roobert/roobert-bold-webfont.woff') format('woff');
        font-weight: bold;
        font-style: normal;
      }

      @font-face {
        font-family: 'Reckless';
        src: url('/fonts/reckless/reckless-regular-webfont.woff2') format('woff2'),
          url('/fonts/reckless/reckless-regular-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: 'Reckless';
        src: url('/fonts/reckless/reckless-regularitalic-webfont.woff2') format('woff2'),
          url('/fonts/reckless/reckless-regularitalic-webfont.woff') format('woff');
        font-weight: normal;
        font-style: italic;
      }
    `}
  />
);

export default Fonts;
