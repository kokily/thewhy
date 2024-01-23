import localFont from 'next/font/local';
import styled from 'styled-components';

import { media } from '@/helper/client/styles';
import Link from 'next/link';

const yoon340 = localFont({
  src: '../../../../public/fonts/YDIYGO340.woff2',
  display: 'swap',
});

interface Props {
  link: HomeLinks;
}

export function LinkItem({ link }: Props) {
  return (
    <LinkItemContainer>
      <LinkItemCard>
        <Link href={link.url}>
          <LinkItemImage src={link.img} alt={link.title} />
        </Link>

        <LinkItemContents>
          <LinkItemTitle className={yoon340.className}>
            <Link href={link.url}>{link.title}</Link>
          </LinkItemTitle>

          <LinkItemLead>{link.sub}</LinkItemLead>
        </LinkItemContents>
      </LinkItemCard>
    </LinkItemContainer>
  );
}

// Styles
const LinkItemContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding: 5px;
  flex: 0 0 33.33333%;
  max-width: 33.33333%;

  ${media.medium} {
    flex: 1 1 50%;
    max-width: 47.5%;
  }

  ${media.small} {
    flex: none;
    max-width: 95%;
  }
`;

const LinkItemCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.06);
  word-wrap: break-word;
  background: white;
  border-radius: 0.25rem;
`;

const LinkItemImage = styled.img`
  cursor: pointer;
  transition: all 0.2s ease 0s;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  flex-shrink: 0;
  -ms-flex-shrink: 0;
  width: 100%;
  vertical-align: middle;
  border-style: none;

  &:hover {
    filter: grayscale(80%);
    -webkit-filter: grayscale(80%);
  }
`;

const LinkItemContents = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 2rem 0.2rem;
`;

const LinkItemTitle = styled.h4`
  font-size: 23px;
  color: #463884;
  text-align: center;
  padding-top: 0.25rem;
  margin: 0;
  letter-spacing: -0.05rem;
  font-weight: 600;
  line-height: 27px;
  margin: 0 0 14px 0;

  &:before {
    content: '';
    display: block;
    border-top: 3px solid rgb(34, 139, 230);
    width: 100px;
    margin: -20px auto 5px;
  }
`;

const LinkItemLead = styled.p`
  margin: 0 0 20px;
  text-align: center;
  max-width: 100%;
  height: 52px;
  word-break: keep-all;
  font-size: 19px;
  color: #000000;
  line-height: 1.3;
`;
