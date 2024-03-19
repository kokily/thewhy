'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { media } from '@/helper/client/style';

interface Props {
  image: string;
}

export function HomeImages({ image }: Props) {
  return (
    <HomeImagesContainer>
      <HomeImagesBox>
        <Image
          src={image}
          width={1110}
          height={587}
          alt={`Main Image`}
          priority={true}
        />
      </HomeImagesBox>
    </HomeImagesContainer>
  );
}

// Styles
const HomeImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const HomeImagesBox = styled.div`
  display: block;
  width: 100%;
  height: auto;
  max-width: 1110px;

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    max-width: 95%;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;
