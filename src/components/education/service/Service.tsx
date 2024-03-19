'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { ServiceHeader } from './ServiceHeader';
import { ServiceBody } from './ServiceBody';
import { ServiceFooter } from './ServiceFooter';
import { media } from '@/helper/client/style';

interface Props {
  service: EducationType;
}

export function Service({ service }: Props) {
  return (
    <ServiceContainer>
      <Image
        src={`/svg/${service.img}`}
        width={1110}
        height={296}
        alt={service.title}
        priority={true}
      />

      <ServiceHeader title={service.title} body={service.body} />
      <ServiceBody list={service.list} />
      <ServiceFooter />
    </ServiceContainer>
  );
}

// Styles
const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1110px;

  img {
    width: 100%;

    ${media.large} {
      max-width: 760px;
    }
  }
`;
