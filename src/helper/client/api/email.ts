import client from './client';

// Send Mail API
export async function sendMailAPI(payload: SendMailPayload) {
  const response = await client.post('/email', payload);
  return response.data;
}
