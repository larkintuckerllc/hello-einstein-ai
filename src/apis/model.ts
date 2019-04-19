import FormData from 'form-data';
import fetch from 'node-fetch';
import accessToken from './accessToken';
import env from './env';

const MODEL_ID = '5R4X6KADPXRM53H4BCJLN324OU';
export default async (phrase: string) => {
  const token = await accessToken();
  const formData = new FormData();
  formData.append('modelId', MODEL_ID);
  formData.append('document', phrase);
  const response = await fetch(`${env.EINSTEIN_VISION_URL}v2/language/intent`, {
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json();
  return json;
};
