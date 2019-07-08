import { Connection, createConnection, getConnectionManager } from 'typeorm';

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
    });
  }
};

