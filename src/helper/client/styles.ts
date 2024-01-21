import { createGlobalStyle } from 'styled-components';

const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const media = {
  large: mediaQuery(1200),
  medium: mediaQuery(992),
  small: mediaQuery(768),
  xsmall: mediaQuery(376),
};

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", Arial, sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @keyframes mask5Up {
    from {
      transform: translate(0, 5%);
    }
    to {
      transform: translate(0, 0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUpShorter {
    from {
      opacity: 0;
      transform: translate(0, 50px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes slideUpFromBottom {
    0% {
      transform: translateY(70%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
