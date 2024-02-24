import { useSession, signOut } from 'next-auth/react';
import styled from 'styled-components';
import { BiExit } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa';
import { media } from '@/helper/client/style';

export function TopRight() {
  const { status } = useSession();

  return (
    <TopRightContainer>
      <TopRightInfos>
        050-5055-7221
        <br />
        thewhy@thewhy.kr
      </TopRightInfos>

      {status === 'authenticated' ? (
        <span
          className="logout"
          onClick={async () =>
            await signOut({ callbackUrl: '/', redirect: true })
          }
        >
          <BiExit size={32} color="#463884" />
        </span>
      ) : (
        <span>
          <FaWhatsapp size={32} color="#463884" />
        </span>
      )}
    </TopRightContainer>
  );
}

// Styles
const TopRightContainer = styled.div`
  display: flex;
  align-items: center;

  ${media.medium} {
    display: none;
  }

  .logout {
    cursor: pointer;
  }
`;

const TopRightInfos = styled.div`
  font-size: 13px;
  font-family: helvetica serif, sans-seif;
  font-weight: 600;
  color: #777;
  margin-right: 1rem;
`;
