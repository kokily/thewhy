import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { media } from '@/helper/client/styles';
import { HeaderTop } from './head/HeaderTop';
import { Navigation } from './nav/Navigation';

export function Header() {
  const [move, setMove] = useState(0);

  const onScroll = () => {
    setMove(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <HeaderContainer>
      <HeaderLayout move={move}>
        <HeaderTop />
      </HeaderLayout>

      <NavContainer>
        <Navigation />
      </NavContainer>
    </HeaderContainer>
  );
}

// Styles
const HeaderContainer = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  background-color: white;
`;

const HeaderLayout = styled.div<{ move: number }>`
  display: flex;
  justify-content: center;
  width: 1110px;
  height: 128px;
  transition: 0.2s;

  ${media.large} {
    width: 100%;
  }

  ${media.medium} {
    width: 100%;
  }

  ${(props) =>
    props.move > 80 &&
    css`
      height: 70px;
    `}
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1110px;
  height: 62px;
  transition: 0.2s all;

  ${media.large} {
    width: 760px;
  }

  ${media.medium} {
    width: 100%;
    height: 100%;
  }

  ${media.xsmall} {
    width: 100%;
  }
`;
