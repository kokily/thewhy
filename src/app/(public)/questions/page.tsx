'use client';

import type { Question } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useLocalStorage from 'use-local-storage';
import qs from 'qs';
import client from '@/helper/client/client';
import { useObserver } from '@/helper/client/hooks/useInfinite';
import { ListQuestions } from '@/components/questions/ListQuestions';

async function listQuestionsAPI(queries: ListQuestionsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Question>>(`/questions?${queryString}`);
  return response.data;
}

export default function ListQuestionsPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listquestionsScroll', 0);

  // States
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState<string>('title');

  // Datat Fetching
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
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
    enabled: true,
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
    router.push(`/question/${id}`);
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
