'use client';

import type { Notice } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useLocalStorage from 'use-local-storage';

import { listNoticesAPI } from '@/helper/client/api/notices';
import { useObserver } from '@/helper/client/hooks';
import { ListNotices } from '@/components/notices/list/ListNotices';

export default function ListNoticesPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listNoticesScroll', 0);

  // Search
  const [search, setSearch] = useState('');

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: Number(''),
    queryKey: ['notices'],
    queryFn: ({ pageParam }) =>
      listNoticesAPI({ cursor: pageParam.toString(), title: search }),
    enabled: true,
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
  });

  const notices = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Notice>).concat(...data.pages);
  }, [data]);

  const onReadNotice = (id: number) => {
    setScrollY(window.scrollY);
    router.push(`/notices/read/${id}`);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
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
