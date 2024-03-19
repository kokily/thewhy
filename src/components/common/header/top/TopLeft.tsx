import styled from 'styled-components';
import { media } from '@/helper/client/style';

export function TopLeft() {
  return (
    <TopLeftContainer>
      <TopLeftTitle>커뮤니케이션 전문 교육 컨설팅</TopLeftTitle>

      <TopLeftIconsBox>
        <a href="#null">
          <TopLeftIcon className="youtube" />
        </a>
        <a href="#null">
          <TopLeftIcon className="naver" />
        </a>
      </TopLeftIconsBox>
    </TopLeftContainer>
  );
}

// Styles
const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  ${media.medium} {
    display: none;
  }
`;

const TopLeftTitle = styled.div`
  font-size: 12.6px;
  font-weight: 600;
  font-family: Poppins, Arial, sans-serif;
  color: #777;
  margin-bottom: 0.7rem;
`;

const TopLeftIconsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin-right: 0.25rem;
  }
`;

const TopLeftIcon = styled.div`
  width: 28px;
  height: 28px;
  transition: 0.2s all;
  background-repeat: no-repeat;
  background-size: cover;

  &.youtube {
    background-image: url('/svg/Youtube_off.svg');
    &:hover {
      background-image: url('/svg/Youtube_on.svg');
    }
  }

  &.naver {
    background-image: url('/svg/Naver_off.svg');
    &:hover {
      background-image: url('/svg/Naver_on.svg');
    }
  }
`;
