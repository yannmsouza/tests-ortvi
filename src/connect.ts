import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { Book } from './domains/book/book';

export const connection = async (): Promise<void | Connection> => {
  const manager = await getConnectionManager();
  try {
    return await manager.get().connect();
  } catch (e) {
    return await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'integracao',
      schema: 'testes',
      synchronize: true,
      entities: [Book]
    });
  }
};

