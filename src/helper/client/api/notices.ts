import type { Notice } from '@prisma/client';
import qs from 'qs';

import client from './client';

export async function listNoticesAPI(queries: ListNoticesQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Notice>>(`/notices?${queryString}`);
  return response.data;
}

export async function readNoticeAPI(id: string) {
  const response = await client.get<Notice>(`/notices/${id}`);
  return response.data;
}

export async function addNoticeAPI(payload: AddNoticePayload) {
  const response = await client.post<Notice>('/notices/add', payload);
  return response.data;
}

export async function removeNoticeAPI(id: string) {
  const response = await client.delete(`/notices/remove/${id}`);
  return response.data;
}

export async function updateNoticeAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddNoticePayload;
}) {
  const response = await client.patch(`/notices/update/${id}`, payload);
  return response.data;
}
