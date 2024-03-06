'use client';

import type { Story } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import qs from 'qs';
import useLocalStorage from 'use-local-storage';
import client from '@/helper/client/client';
import { ListStories } from '@/components/stories/ListStories';
import { useObserver } from '@/helper/client/hooks/useInfinite';

async function listStoriesAPI(queries: ListStoriesQuery) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Story>>(`/stories?${queryString}`);
  return response.data;
}

export default function ListStoriesPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listStoriesScroll', 0);

  // State
  const [search, setSearch] = useState('');

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['stories'],
    queryFn: ({ pageParam }) => listStoriesAPI({ cursor: pageParam, title: search }),
    getNextPageParam: (data) =>
      data && data.length === 12 ? data[data.length - 1].id : undefined,
    enabled: true,
  });

  const stories = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Story>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadStory = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/story/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <ListStories
      stories={stories}
      search={search}
      onChange={onChange}
      onSearch={onSearch}
      onReadStory={onReadStory}
      setTarget={setTarget}
    />
  );
}
