import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string, {});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('My List API', () => {
  it('should add an item to the list', async () => {
    const response = await request(app)
      .post('/api/mylist')
      .send({ userId: '1', itemId: 'movie1', itemType: 'Movie' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Item added to list');
  });

  it('should remove an item from the list', async () => {
    const response = await request(app)
      .delete('/api/mylist')
      .send({ userId: '1', itemId: 'movie1' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item removed from list');
  });

  it('should list items', async () => {
    const response = await request(app)
      .get('/api/mylist')
      .query({ userId: '1', page: 1, limit: 10 });
    expect(response.status).toBe(200);
    expect(response.body.items).toBeDefined();
    expect(response.body.pagination).toBeDefined();
  });
});
