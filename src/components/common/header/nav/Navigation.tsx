import { useState, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';
import { useMobile } from '@/helper/client/hooks/useInfinite';
import { media } from '@/helper/client/style';
import { NavsList } from './NavsList';

export function Navigation() {
  const isSmall = useMobile();
  const [toggle, setToggle] = useState(false);

  const onToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return (
    <NavigationContainer>
      {isSmall ? (
        <NavigationMobileWrapper>
          <NavigationMobile>
            {toggle ? (
              <IoMdClose className="on" size={30} onClick={onToggle} />
            ) : (
              <GiHamburgerMenu className="off" size={30} onClick={onToggle} />
            )}
          </NavigationMobile>

          <NavsList toggle={toggle} isSmall={isSmall} onToggle={onToggle} />
        </NavigationMobileWrapper>
      ) : (
        <NavsList isSmall={isSmall} />
      )}
    </NavigationContainer>
  );
}

// Styles
const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${media.medium} {
    width: 100%;
  }
`;

const NavigationMobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${media.medium} {
    width: 100%;
  }
`;

const NavigationMobile = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
  padding-right: 15px;
  height: 60px;
  transition: 0.2s all;
  width: 100%;
  max-width: 694.11px;

  svg {
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;

    &.off {
      background: #6799ff;
      color: white;
    }

    &.on {
      background: white;
      color: #6799ff;
      border: 1px solid #6799ff;
    }
  }
`;
