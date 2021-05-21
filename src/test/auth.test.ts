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
    });

    it('Refresh token -> create new access token', async () => {
        // register new user for mocking data
        const register = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    username: faker.internet.userName(),
                    password: '123456',
                });
        const result = await request(app)
            .post('/api/v1/auth/refresh')
            .send({
                token: register.body.refresh,
            });
        expect(result.body).toHaveProperty('token');
        expect(result.body.token.length > 0).toBe(true);
    });

    it('Refresh token -> token is not valid -> error', async () => {
        const register = await request(app)
            .post('/api/v1/auth/register')
            .send({
                username: faker.internet.userName(),
                password: '123456',
            });
        const result = await request(app)
            .post('/api/v1/auth/refresh')
            .send({
                token: register.body.token,
            });
        expect(result.body.message).toBe('Unauthorized');
    });
})