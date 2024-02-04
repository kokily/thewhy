import client from './client';

export async function addReplyAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddReplyPayload;
}) {
  const response = await client.patch(`/questions/reply/${id}`, payload);
  return response.data;
}

export async function removeReplyAPI(id: string) {
  const response = await client.delete(`/questions/reply/remove/${id}`);
  return response.data;
}
