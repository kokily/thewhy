import Image from 'next/image';
import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';
import styled, { css } from 'styled-components';

import { useMedia } from '@/helper/client/hooks';
import { media } from '@/helper/client/styles';

export function CopyItem() {
  const isSmall = useMedia('(max-width: 480px)');

  const Logo = () => (
    <Link href="/">
      <Image
        src="/images/logo2.png"
        width={66}
        height={32}
        alt="Logo"
        priority
      />
    </Link>
  );

  const Copy = () =>
    isSmall ? (
      <div>
        <p>Copyright(c) 2021. All Right reserved.</p>
        <p>
          <strong>사업자등록번호</strong> 640-88-02162
        </p>
        <p>
          <strong>통신판매업신고</strong> 제2021-다산0477
        </p>
      </div>
    ) : (
      <div>
        Copyright(c) 2021, All Right reserved. <strong>사업자등록번호</strong>{' '}
        640-88-02162 <strong>통신판매업신고</strong> 제2021-다산-0477
      </div>
    );

  const Links = () => (
    <CopyrightEtcLink>
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
    </CopyrightEtcLink>
  );

  return (
    <>
      <CopyItemContainer divide="logo">
        <Logo />
      </CopyItemContainer>
      <CopyItemContainer divide="copy">
        <Copy />
      </CopyItemContainer>
      <CopyItemContainer divide="link">
        <Links />
      </CopyItemContainer>
    </>
  );
}

// Styles
const CopyItemContainer = styled.div<{
  divide: 'logo' | 'copy' | 'link';
}>`
  display: flex;
  position: relative;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: flex-start;
  align-items: center;

  ${media.small} {
    display: inline-block;
    flex: none !important;
    max-width: 100% !important;
    margin-bottom: 1.25rem;
  }

  img {
    height: 32px;
  }

  ${(props) =>
    props.divide === 'logo' &&
    css`
      flex: 0 0 8.333333%;
      max-width: 8.333333%;
    `}

  ${(props) =>
    props.divide === 'copy' &&
    css`
      flex: 0 0 58.333333%;
      max-width: : 58.333333%;

      div {
        font-size: 0.75rem;
        line-height: 26px;
        margin: 0;
        padding: 0;
        color: #555;

        strong {
          color: #c5c5c5;
        }
      }
  `}

  ${(props) =>
    props.divide === 'link' &&
    css`
      flex: 0 0 33.333333%;
      max-width: : 33.333333%;
      justify-content: flex-end;
    `}
`;

const CopyrightEtcLink = styled.nav`
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
