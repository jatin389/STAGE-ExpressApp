import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import { User } from '../src/models/user';
import { faker } from '@faker-js/faker';


beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string, {});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('My List API', () => {
  let userId: string;
  
  beforeEach(async () => {
    userId = faker.string.uuid();
    const requestBody = {
      id: userId,
      username: faker.internet.userName(),
      preferences: {
        favoriteGenres: faker.helpers.arrayElements(['Action', 'Comedy', 'Drama', 'Horror', 'Romance'], 3),
        dislikedGenres: faker.helpers.arrayElements(['Action', 'Comedy', 'Drama', 'Horror', 'Romance'], 2)
      },
      watchHistory: [],
      myList: []
    }
    console.log("requestBody", requestBody)
    const userResponse = await request(app)
      .post('/api/users')
      .send(requestBody);

    expect(userResponse.status).toBe(201);
  });

  describe('Add Item to List', () => {

    it('should add an item to the list', async () => {
      const itemId = faker.string.uuid();
  
      const response = await request(app)
        .post('/api/mylist')
        .send({ userId: userId, itemId: itemId, itemType: 'Movie' });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Item added to list');
  
      const user = await User.findOne({ id: userId });
      expect (user).toBeDefined();
      expect (user?.myList[0]?.itemId).toEqual(itemId);
    });

    it('should return error if item already exists', async () => {
      const itemId = faker.string.uuid();
  
      const response = await request(app)
        .post('/api/mylist')
        .send({ userId: userId, itemId: itemId, itemType: 'Movie' });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Item added to list');

      const response2 = await request(app)
        .post('/api/mylist')
        .send({ userId: userId, itemId: itemId, itemType: 'Movie' });
      expect(response2.status).toBe(500);
      expect(response2.body.message).toBe('Item already in list');
    });

    it('should return error if itemId is not valid UUID', async () => {
      const itemId = "not a valid uuid";
  
      const response = await request(app)
        .post('/api/mylist')
        .send({ userId: userId, itemId: itemId, itemType: 'Movie' });
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("\"itemId\" must be a valid GUID");
    });

  });

  describe('Remove Item from List', () => {
    it('should remove an item from the list', async () => {
      const itemId = faker.string.uuid();
  
      const addResponse = await request(app)
        .post('/api/mylist')
        .send({ userId: userId, itemId: itemId, itemType: 'Movie' });
      expect(addResponse.status).toBe(201);
      expect(addResponse.body.message).toBe('Item added to list');
  
      
      const removeResponse = await request(app)
        .delete('/api/mylist')
        .send({ userId: userId, itemId: itemId });
      expect(removeResponse.status).toBe(200);
      expect(removeResponse.body.message).toBe('Item removed from list');
    });

    it('should return error if itemId is not valid UUID', async () => {
      const itemId = "not a valid uuid";
  
      const response = await request(app)
        .delete('/api/mylist')
        .send({ userId: userId, itemId: itemId });
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("\"itemId\" must be a valid GUID");
    });

    // TODO: Add more test cases later
  
  });

  
  describe('Get My List', () => {

    it('should list items', async () => {
      let itemId = faker.string.uuid();
      let addResponse = await request(app)
        .post('/api/mylist')
        .send({ userId: userId, itemId: itemId, itemType: 'Movie' });
      expect(addResponse.status).toBe(201);
      expect(addResponse.body.message).toBe('Item added to list');

      itemId = faker.string.uuid();
      addResponse = await request(app)
        .post('/api/mylist')
        .send({ userId: userId, itemId: itemId, itemType: 'Movie' });
      expect(addResponse.status).toBe(201);
      expect(addResponse.body.message).toBe('Item added to list');

      const response = await request(app)
        .get('/api/mylist')
        .query({ userId: userId, page: 1, limit: 10 });
      expect(response.status).toBe(200);
      expect(response.body.items).toBeDefined();
      expect(response.body.pagination).toBeDefined();
    });
  });

  // TODO: Add more test cases later
  
});
