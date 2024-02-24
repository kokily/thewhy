'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { media } from '@/helper/client/style';
import { NavItemSubList } from './NavItemSubList';

interface Props {
  menu: MenuType;
  isSmall?: boolean;
}

export function NavItem({ menu, isSmall }: Props) {
  const [isOpen, setIsOpen] = useState('');

  const onOpen = () => {
    if (isOpen === 'open') {
      setIsOpen('');
    } else {
      setIsOpen('open');
    }
  };

  return (
    <NavItemContainer className={`main ${isOpen}`}>
      {menu.items ? (
        <>
          <NavItemOpenButton onClick={onOpen} className="title">
            <span>{menu.title}</span>

            {isSmall && (
              <>
                {isOpen ? (
                  <IoIosArrowUp size={14} />
                ) : (
                  <IoIosArrowDown size={14} />
                )}
              </>
            )}
          </NavItemOpenButton>

          <NavItemList className="hidden">
            {menu.items.map((item) => (
              <NavItemSubList key={item.id} item={item} />
            ))}
          </NavItemList>
        </>
      ) : (
        <NavItemOpenButton>
          <Link href={menu.url} passHref={true}>
            {menu.title}
          </Link>
        </NavItemOpenButton>
      )}
    </NavItemContainer>
  );
}

// Styles
const NavItemContainer = styled.li`
  display: inline-block;
  position: relative;
  background: white;
  font-size: 14px;
  font-weight: 700;
  color: #212529;

  .hidden {
  }
  span:hover + .hidden,
  .hidden:hover {
    @media (min-width: 769px) {
      display: block;
    }
  }

  ${media.medium} {
    border-bottom: 1px solid #e8e8e8;
    clear: both;
    display: block;
    float: none;
    margin: 0;
    padding: 0;
    line-height: 24px;
    &.open {
      .hidden {
        display: block;
      }
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  span {
    display: inline-flex;
    align-items: center;
    white-space: normal;
    cursor: pointer;
    letter-spacing: -0.5px;
    clear: both;
    &:hover {
      color: #0088cc;
    }
    &.link {
      padding: 0.3rem 0.4rem;
      color: #0088cc;
    }
  }
`;

const NavItemOpenButton = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: normal;
  cursor: pointer;
  letter-spacing: -0.5px;
  clear: both;

  &:hover {
    color: #0088cc;
  }

  ${media.medium} {
    color: #0088cc;
    font-size: 13px;
    font-style: normal;
    line-height: 20px;
    padding: 7px 8px;
    margin: 1px 0;
  }
`;

const NavItemList = styled.ul`
  display: none;
  position: absolute;
  min-width: 200px;
  padding: 5px 5px;
  left: auto;
  text-align: left;
  box-shadow: 0 15px 30px -5px rgb(0 0 0 / 7%);
  background: white;
  background-clip: padding-box;
  transform: translateX(-27%);
  li {
    transition: 0.2s all;
  }
  ${media.medium} {
    background: transparent;
    padding: 0;
    margin: 0;
    font-size: 13px;
    box-shadow: none;
    border-radius: 0;
    border: 0;
    clear: both;
    display: none;
    float: none;
    position: static;
    transform: none;
    top: 100%;
    left: 0;
    z-index: 1000;
    min-width: 10rem;
    color: #212529;
  }
`;
