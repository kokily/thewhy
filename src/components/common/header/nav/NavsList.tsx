import styled, { css } from 'styled-components';
import { NavMenu } from '@/helper/client/menu';
import { media } from '@/helper/client/style';
import { NavItem } from './NavItem';

interface Props {
  toggle?: boolean;
  isSmall?: boolean;
}

export function NavsList({ toggle, isSmall }: Props) {
  return (
    <NavsListContainer toggle={toggle}>
      <NavsListUl className="menu">
        {NavMenu.map((menu) => (
          <NavItem key={menu.id} menu={menu} isSmall={isSmall} />
        ))}
      </NavsListUl>
    </NavsListContainer>
  );
}

// Styles
const NavsListContainer = styled.div<{
  toggle?: boolean;
  isSmall?: boolean;
}>`
  display: flex;
  justify-content: center;
  width: 100%;

  ${media.medium} {
    max-height: 50vh;
    overflow: hidden;
    overflow-y: auto;
    padding: 0px;
    padding-left: 0;
    margin-bottom: 0;
    transition: ease all 500ms fadeIn;
    flex-wrap: wrap;
    display: none;
    animation-name: fadeIn;
    animation-duration: 0.4s;

    ${(props) =>
      props.toggle &&
      css`
        display: flex;
      `};
  }
`;

const NavsListUl = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 694.11px;
  list-style: none;

  ${media.medium} {
    padding: 0 15px;
    margin: 0;
    flex-direction: column;
  }
`;
