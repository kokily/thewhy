'use client';

import { Location } from '@/components/locate/Location';
import { useEffect } from 'react';

export default function LocatePage() {
  const latitude = 37.62540679378858;
  const longitude = 127.15083423105426;

  useEffect(() => {
    const $script = document.createElement('script');

    $script.async = true;
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appKey=${process.env.NEXT_PUBLIC_KAKAOMAP_APP_KEY}&autoload=false`;

    document.head.appendChild($script);

    function onLoadMap() {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 2,
        };

        new window.kakao.maps.Map(container, options);
      });
    }

    $script.addEventListener('load', onLoadMap);

    return () => $script.removeEventListener('load', onLoadMap);
  }, [latitude, longitude]);

  return <Location />;
}
