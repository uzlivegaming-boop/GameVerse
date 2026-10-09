import client from './client';

export const getGame = async () => {
  const response = await client.get('/games');
  return response.data.data;
};

export const getGameById = async (id) => {
  const response = await client.get(`/games/${id}`);
  return response.data.data;
};

export const createGame = async (data) => {
  const response = await client.post('/games', data);
  return response.data.data;
};

export const updateGame = async (id, data) => {
  const response = await client.put(`/games/${id}`, data);
  return response.data.data;
};

export const deleteGame = async (id) => {
  await client.delete(`/games/${id}`);
};