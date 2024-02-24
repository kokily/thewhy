import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';
import { media } from '@/helper/client/style';

export function LinksItem() {
  return (
    <LinkContainer>
      <EtcLink>
        <EtcLinkList>
          <li>
            <MdKeyboardArrowRight />
            <Link href="/faq">FAQ&apos;s</Link>
          </li>
          <li>
            <MdKeyboardArrowRight />
            <Link href="/term">이용약관</Link>
          </li>
          <li>
            <MdKeyboardArrowRight />
            <Link href="/privacy">개인정보처리방침</Link>
          </li>
        </EtcLinkList>
      </EtcLink>
    </LinkContainer>
  );
}

// Styles
const LinkContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  justify-content: flex-end;

  ${media.small} {
    display: inline-block;
    flex: none !important;
    max-width: 100% !important;
    margin-bottom: 1.25rem;
  }

  img {
    height: 32px;
  }
`;

const EtcLink = styled.nav`
  font-size: 12px;
  color: #777;
`;

const EtcLinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: inline-block;
    position: relative;
    line-height: 12px;
    margin: 0;
    padding: 0 8px;
    margin-right: 1rem;

    svg {
      position: absolute;
      top: 0px;
      left: -6px;
    }

    a {
      transition: 0.12s all;
    }

    a:hover {
      color: white;
    }
  }
`;
