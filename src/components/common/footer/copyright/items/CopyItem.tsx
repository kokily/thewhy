import styled from 'styled-components';
import { useMobile } from '@/helper/client/hooks';
import { media } from '@/helper/client/style';

export function CopyItem() {
  const isMobile = useMobile();

  return (
    <CopyContainer>
      {isMobile ? (
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
      )}
    </CopyContainer>
  );
}

// Styles
const CopyContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 58.333333%;
  max-width: 58.333333%;

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
