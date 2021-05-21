import request from "supertest";
import app from "../providers/express";
import { createDB } from "../providers/database";
import faker from 'faker';
import {getConnection} from "typeorm";
import {quitAsync} from "../providers/redis";

describe('Testing auth API', () => {
    beforeAll(async () => {
        //todo: create test database
        await createDB();
    });

    afterAll(async () => {
        await getConnection('default').close();
        await quitAsync();
    })


    it('Register (no body message)', async () => {
        const result = await request(app).post('/api/v1/auth/register');
        expect(result.body.name).toBe('BadRequestError');
    });

    it('Register new user', async () => {
        const result = await request(app)
            .post('/api/v1/auth/register')
            .send({
                username: faker.internet.userName(),
                password: '123456',
            });
        expect(result.body).toHaveProperty('token');
        expect(result.body.token.length > 0 ).toBe(true);
        expect(result.body).toHaveProperty('refresh');
        expect(result.body.refresh.length > 0).toBe(true);
    })
})