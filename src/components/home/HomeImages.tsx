'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import styled from 'styled-components';

import { media } from '@/helper/client/styles';

interface Props {
  slides: Array<string>;
}

export function HomeImages({ slides }: Props) {
  const slideSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: 'linear',
  };

  return (
    <HomeImagesContainer>
      <HomeImagesBox>
        <Slider {...slideSetting}>
          {slides.map((slide, i) => (
            <div key={i}>
              <Image
                src={slide}
                width={1110}
                height={587}
                alt={`Main Image ${i}`}
                priority
              />
            </div>
          ))}
        </Slider>
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
