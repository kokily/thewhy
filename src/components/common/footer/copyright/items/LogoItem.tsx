import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { media } from '@/helper/client/style';

export function LogoItem() {
  return (
    <LogoContainer>
      <Link href="/">
        <Image
          src="/images/logo2.png"
          width={66}
          height={32}
          alt="Logo"
          priority={true}
        />
      </Link>
    </LogoContainer>
  );
}

// Styles
const LogoContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 8.333333%;
  max-width: 8.333333%;

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
