import { Connection, createConnection, getConnection } from 'typeorm';

export const connect = async (): Promise<Connection> => {
  const connection = await createConnection();
  return connection;
}

export const close = async (): Promise<void> => {
  const connection: Connection = getConnection();
  
  await connection.close();
}

