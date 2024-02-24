'use client';

import type { Notice } from '@prisma/client';
import type { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import localFont from 'next/font/local';
import styled, { css } from 'styled-components';
import { media } from '@/helper/client/style';
import { useSession } from 'next-auth/react';
import { useMobile } from '@/helper/client/hooks';
import Link from 'next/link';
import { Search } from '../common/Search';
import { NoticeContents } from './NoticeContents';

const yoon320 = localFont({
  src: '../../../public/fonts/YDIYGO320.woff2',
  display: 'swap',
});

interface Props {
  notices: Array<Notice>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onReadNotice: (id: string) => void;
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

export function ListNotices(props: Props) {
  const { status } = useSession();
  const isMobile = useMobile();
  const notices = props.notices;

  return (
    <NoticesContainer>
      <NoticesContents>
        <SearchBox $small={isMobile ? true : false}>
          {!isMobile && status === 'authenticated' ? (
            <Link href="/notices/add" passHref={true}>
              <Button className={yoon320.className}>공지 작성</Button>
            </Link>
          ) : (
            <span></span>
          )}

          <Search
            mode="제목"
            search={props.search}
            onChange={props.onChange}
            onSearch={props.onSearch}
          />
        </SearchBox>

        <NoticeContents notices={notices} onReadNotice={props.onReadNotice} />
      </NoticesContents>
    </NoticesContainer>
  );
}

// Styles
const NoticesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoticesContents = styled.div`
  width: 100%;
  justify-content: center;

  ${media.large} {
    max-width: 760px;
  }
`;

const SearchBox = styled.div<{ $small: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${(props) =>
    props.$small &&
    css`
      justify-content: flex-end;
    `}
`;

const Button = styled.button`
  height: 40px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem 0.6rem 1rem;
  background: white;
  color: #db3603;
  border: 2px solid #db3603;
  border-radius: 14px;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    background: #db3603;
    color: white;
  }
`;
