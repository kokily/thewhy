'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useIsMounted() {
  const mountedRef = useRef(false);
  const isMounted = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return isMounted;
}

export function useMedia(query: string) {
  const [matches, setMatches] = useState<boolean | null>(
    typeof window !== 'undefined' ? () => window.matchMedia(query).matches : null,
  );

  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted()) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const listener = () => {
      if (isMounted()) {
        setMatches(mediaQueryList.matches);
      }
    };

    mediaQueryList.addListener(listener);

    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, [query, isMounted]);

  return matches;
}

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMedia('(max-width: 768px)');

  useEffect(() => {
    if (mobile) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [mobile]);

  return isMobile;
}

export function useObserver({
  onIntersect,
  root,
  rootMargin = '0px',
  threshold = 0,
}: ObserverProps) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [onIntersect, root, rootMargin, target, threshold]);

  return {
    setTarget,
  };
}
