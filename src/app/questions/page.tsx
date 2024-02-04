'use client';

import type { Question } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';

import { listQuestionsAPI } from '@/helper/client/api/questions';
import { useObserver } from '@/helper/client/hooks';
import { ListQuestions } from '@/components/questions/list/ListQuestions';

export default function ListQuestionsPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listQuestionsScroll', 0);

  // Search
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState<string>('title');

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['questions'],
    queryFn: ({ pageParam }) =>
      listQuestionsAPI({
        cursor: pageParam,
        title: select === 'title' ? search : '',
        username: select === 'username' ? search : '',
        email: select === 'email' ? search : '',
        phone: select === 'phone' ? search : '',
      }),
    enabled: true,
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
  });

  const questions = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Question>).concat(...data.pages);
  }, [data]);

  // Search Functions
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadQuestion = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/questions/read/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <ListQuestions
      questions={questions}
      search={search}
      select={select}
      onChange={onChange}
      onChangeSelect={onChangeSelect}
      onSearch={onSearch}
      onReadQuestion={onReadQuestion}
      setTarget={setTarget}
    />
  );
}
