import type { Question } from '@prisma/client';
import qs from 'qs';

import client from './client';

export async function listQuestionsAPI(queries: ListQuestionsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Question>>(
    `/questions?${queryString}`,
  );
  return response.data;
}

export async function readQuestionAPI(id: string) {
  const response = await client.get<Question>(`/questions/${id}`);
  return response.data;
}

export async function addQuestionAPI(payload: AddQuestionPayload) {
  const response = await client.post<Question>('/questions/add/', payload);
  return response.data;
}

export async function removeQuestionAPI({
  id,
  password,
}: {
  id: string;
  password?: string;
}) {
  const response = await client.patch(`/questions/remove/${id}`, { password });
  return response.data;
}

export async function updateQuestionAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddQuestionPayload;
}) {
  const response = await client.patch(`/questions/update/${id}`, payload);
  return response.data;
}

export async function validQuestionAPI({
  id,
  password,
}: {
  id: string;
  password: string;
}) {
  const response = await client.post(`/questions/valid/${id}`, {
    password,
  });
  return response.data;
}
