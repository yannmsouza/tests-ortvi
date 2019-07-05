import req from 'supertest';
import server from './server';
import { getConnection } from 'typeorm';
import { connection } from './connect';

// a helper function to make a POST request
export function post(url: string, body: any) {
  const httpRequest = req(server).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json');
  httpRequest.set('Origin', 'http://localhost:3000');
  return httpRequest;
}


// a helper function to connect db because of parallel executions
export const conn = async () => {
  try {
    console.log('porrr q');
    await connection();
  } catch (e) {
    await getConnection();
  }
};