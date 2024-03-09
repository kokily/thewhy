import type { ChangeEvent, SyntheticEvent } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { useMobile } from '@/helper/client/hooks/useInfinite';
import { Search } from '../common/Search';

interface Props {
  search: string;
  select: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
}

export function SearchBox(props: Props) {
  const isMobile = useMobile();

  let mode = '';

  switch (props.select) {
    case 'title':
      mode = '제목';
      break;
    case 'username':
      mode = '작성자';
      break;
    case 'phone':
      mode = '휴대폰번호';
      break;
    case 'email':
      mode = '이메일주소';
      break;
    default:
      mode = '제목';
      break;
  }

  return (
    <SearchContainer small={isMobile}>
      {!isMobile && (
        <Link href="/questions/add">
          <Button>문의 작성</Button>
        </Link>
      )}

      <SearchRight>
        <Select value={props.select} onChange={props.onChangeSelect}>
          <option value="title">제목</option>
          <option value="username">작성자</option>
          <option value="phone">휴대폰번호</option>
          <option value="email">이메일주소</option>
        </Select>

        <Search
          mode={mode}
          search={props.search}
          onChange={props.onChange}
          onSearch={props.onSearch}
        />
      </SearchRight>
    </SearchContainer>
  );
}

// Styles
const SearchContainer = styled.div<{ small: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${(props) =>
    props.small &&
    css`
      justify-content: flex-end;
    `}
`;

const SearchRight = styled.div`
  display: flex;
`;

const Select = styled.select`
  width: 100px;
  height: 40px;
  margin-right: 0.2rem;
  padding: 0 2px;
  font-size: 0.9rem;
  border: 1px solid #d0cfce;
  border-radius: 5px;
  outline: none;
  transition: 0.12s all;

  &:focus {
    border: 1px solid #008abf;
    color: #008abf;

    &::-webkit-input-placeholder {
      transition: opacity 0.45s ease;
      opacity: 0;
    }

    &::-moz-placeholder {
      transition: opacity 0.45s ease;
      opacity: 0;
    }

    &:-ms-placeholder {
      transition: opacity 0.45s ease;
      opacity: 0;
    }
  }
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
