import { NextFunction, Request, Response } from 'express';
import {authHandler} from './auth.middleware';

describe('Authorization middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
    });

    test('without headers', async () => {
        const statusCode = 401;
        const expectedResponse = "Not authorized";
        authHandler(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toBeCalledWith(statusCode);
        expect(mockResponse.send).toBeCalledWith(expectedResponse);
    });

    test('without "authorization" header', async () => {
        const statusCode = 401;
        const expectedResponse = "Not authorized";
        mockRequest = {
            headers: {
            }
        }
        authHandler(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toBeCalledWith(statusCode);
        expect(mockResponse.send).toBeCalledWith(expectedResponse);
    });

    test('with "authorization" header', async () => {
        mockRequest = {
            headers: {
                'userid': '1'
            }
        }
        authHandler(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
    });
});
