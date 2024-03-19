'use client';

import type { Notice } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';
import qs from 'qs';
import client from '@/helper/client/client';
import { useObserver } from '@/helper/client/hooks/useInfinite';
import { ListNotices } from '@/components/notices/ListNotices';

// API
async function listNoticesAPI(queries: ListNoticesQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Notice>>(`/notices?${queryString}`);
  return response.data;
}

export default function ListNoticesPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listNoticesScroll', 0);

  // State
  const [search, setSearch] = useState('');

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['notices'],
    queryFn: ({ pageParam }) => listNoticesAPI({ cursor: pageParam, title: search }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
    enabled: true,
  });

  const notices = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Notice>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadNotice = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/notice/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <ListNotices
      notices={notices}
      search={search}
      onChange={onChange}
      onSearch={onSearch}
      onReadNotice={onReadNotice}
      setTarget={setTarget}
    />
  );
}
