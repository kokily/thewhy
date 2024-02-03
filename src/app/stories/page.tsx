'use client';

import type { Story } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useMemo, useState, useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useLocalStorage from 'use-local-storage';

import { listStoriesAPI } from '@/helper/client/api/stories';
import { useMobile, useObserver } from '@/helper/client/hooks';
import { ListStories } from '@/components/stories/list/ListStories';

export default function ListStoriesPage() {
  const { status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [scrollY, setScrollY] = useLocalStorage('listStoriesScroll', 0);
  const [search, setSearch] = useState('');

  const isMobile = useMobile();

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['stories'],
    queryFn: ({ pageParam }) =>
      listStoriesAPI({ cursor: pageParam, title: search }),
    enabled: true,
    getNextPageParam: (data) =>
      data && data.length === 12 ? data[data.length - 1].id : undefined,
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
    await queryClient.invalidateQueries({ queryKey: ['stories'] });
    await refetch();
  };

  const onReadStory = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/stories/read/${id}`);
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
      isMobile={isMobile}
      isAdmin={status === 'authenticated'}
      search={search}
      onChange={onChange}
      onSearch={onSearch}
      stories={stories}
      onReadStory={onReadStory}
      setTarget={setTarget}
    />
  );
}
