import type { Story } from '@prisma/client';
import qs from 'qs';

import client from './client';

// List Stories
export async function listStoriesAPI(queries: ListStoriesQuery) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Story>>(`/stories?${queryString}`);
  return response.data;
}

// Read Story
export async function readStoryAPI(id: string) {
  const response = await client.get<Story>(`/stories/${id}`);
  return response.data;
}

// Add Story
export async function addStoryAPI(payload: AddStoryPayload) {
  const response = await client.post<Story>('/stories/add', payload);
  return response.data;
}

// Remove Story
export async function removeStoryAPI(id: string) {
  const response = await client.delete(`/stories/remove/${id}`);
  return response.data;
}

// Update Story
export async function updateStoryAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddStoryPayload;
}) {
  const response = await client.patch<Story>(`/stories/update/${id}`, payload);
  return response.data;
}
