const {app} = require('../src/server');
const request = require('supertest');

describe('GET /todos', () => {
  test('Debe de retornar todos los elementos en de la base de datos',
      async () => {
        const response = await request(app).get('/api/v1/todos').send();
        expect(response.statusCode).toBe(200);
      }, 20000);
});

describe('GET /todos/:id', () => {
  test('Debe de retornar un error 404 si ID no existe', async () => {
    const response = await request(app).get('/api/v1/todos/1').send();
    expect(response.statusCode).toBe(404);
  }, 10000);
  test('Debe de retornar la tarea correspondiente al ID', async () => {
    const response = await request(app)
        .get('/api/v1/todos/dcafabe0-ed9c-4b0c-b1f3-a1c488dafafb')
        .send();
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /todos', () => {
  test('Debe agregar una nueva tarea a la BD', async () => {
    const response = await request(app)
        .post('/api/v1/todos')
        .send({
          taskName: 'Tarea a crear',
          status: 'no definido',
          dueDate: '08/02/2022 15:33',
          notes: '',
        });
    expect(response.statusCode).toBe(200);
  }, 10000);
  test('Debe de retornar estatus 400 si no agrega uno de los campos',
      async () => {
        const response = await request(app)
            .post('/api/v1/todos')
            .send({
              taskName: 'Tarea a crear',
              status: 'no definido',
              dueDate: '08/02/2022 15:33',
            });
        expect(response.statusCode).toBe(400);
      });
});

describe('PATCH /todos/:id', () => {
  test('Debe actualizar el elemento requerido', async () => {
    const response = await request(app)
        .patch('/api/v1/todos/dcafabe0-ed9c-4b0c-b1f3-a1c488dafafb')
        .send({
          taskName: 'Tarea a actualizada desde test',
          status: 'no definido',
          dueDate: '08/02/2022 15:33',
          notes: 'notes desde test',
        });
    expect(response.statusCode).toBe(200);
  }, 10000);
  test('Debe de retornar estatus 404 si ID no existe',
      async () => {
        const response = await request(app)
            .patch('/api/v1/todos/1')
            .send({
              taskName: 'Tarea a crear',
              status: 'no definido',
              dueDate: '08/02/2022 15:33',
              notes: 'notes desde test',
            });
        expect(response.statusCode).toBe(404);
      });
});

describe('DELETE /todos/:id', () => {
  test('Debe devolver 404 si ID no existe', async () => {
    const response = await request(app)
        .delete('/api/v1/todos/1')
        .send();
    expect(response.statusCode).toBe(404);
  }, 10000);
});
