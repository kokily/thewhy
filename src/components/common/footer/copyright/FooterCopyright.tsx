import styled from 'styled-components';
import { media } from '@/helper/client/style';
import { LogoItem } from './items/LogoItem';
import { CopyItem } from './items/CopyItem';
import { LinksItem } from './items/LinksItem';

export function FooterCopyright() {
  return (
    <CopyrightContainer>
      <CopyrightLayout>
        <CopyrightContents>
          <LogoItem />
          <CopyItem />
          <LinksItem />
        </CopyrightContents>
      </CopyrightLayout>
    </CopyrightContainer>
  );
}

// Styles
const CopyrightContainer = styled.div`
  display: block;
  background: #1c2023;
`;

const CopyrightLayout = styled.div`
  max-width: 1110px;
  width: 100%;
  padding: 0.5rem 15px;
  margin-left: auto;
  margin-right: auto;
`;

const CopyrightContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
  padding-top: 24px;
  padding-bottom: 24px;

  ${media.small} {
    display: block;
    text-align: center;
  }
`;
