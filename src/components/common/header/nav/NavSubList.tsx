import Link from 'next/link';
import styled from 'styled-components';

import { media } from '@/helper/client/styles';

interface Props {
  item: ItemType;
}

export function NavSubList({ item }: Props) {
  return (
    <NavSubListContainer>
      <Link href={item.subUrl} passHref={true}>
        <NavSubListLinkName>{item.subTitle}</NavSubListLinkName>
      </Link>
    </NavSubListContainer>
  );
}

// Styles
const NavSubListContainer = styled.li`
  display: block;
  min-height: 42px;
  line-height: 42px;

  &:hover {
    background: #f0f0f0;
    color: #94f6c2;
  }

  &:last-child span {
    border: none;
  }

  ${media.medium} {
    clear: both;
    float: none;
    margin: 0;
    padding: 0;
    position: relative;
    line-height: 24px;
  }
`;

const NavSubListLinkName = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  font-family: 'Poppins', Arial, sans-serif;
  color: #777;
  width: auto;
  min-width: 200px;
  padding-left: 5px;
  border-bottom: 1px solid #f7f7f7;

  ${media.medium} {
    font-size: 13px;
    font-style: normal;
    line-height: 20px;
    padding: 7px 22px !important;
    margin: 1px 0;
    display: block;
    width: 100%;
    clear: both;
    white-space: nowrap;
    color: #777 !important;
  }
`;
