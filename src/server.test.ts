import req from 'supertest';
import server from './server';


test('[GET] /_healthcheck', async () => {
  const res = await req(server).get('/_healthcheck');
  expect(typeof res.body.uptime).toBe('number');
});

// test(' Teste Integração - Book Connection Database', async () => {
//   //Conexão com o Banco
//   await connection();
//   const conn = getConnection();
//   const bookRepository = conn.getRepository(Book);
//   expect(bookRepository).toBeDefined();
//   expect(typeof bookRepository).toBe('object');
//
//   //Modelo Livro
//   let book = new Book('Engenharia de Software por Ian Sommerville');
//   book = await bookRepository.save(book);
//   console.log(book);
//   expect(typeof book).toBe('object');
//   expect(book.name).toBe('Engenharia de Software por Ian Sommerville');
// });

