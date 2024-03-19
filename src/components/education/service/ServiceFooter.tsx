import Image from 'next/image';
import styled from 'styled-components';

export function ServiceFooter() {
  return (
    <FooterContainer>
      <Image
        src="/svg/footer.svg"
        width={825}
        height={121}
        alt="커뮤니케이션 교육"
        className="footer"
        priority
      />
    </FooterContainer>
  );
}

// Styles
const FooterContainer = styled.div`
  display: flex;
  max-width: 720px;
  width: 100%;
  margin-top: 2.5rem;
`;
