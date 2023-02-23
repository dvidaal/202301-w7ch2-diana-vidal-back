import request from "supertest";
import { app } from "../../index";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDataBase from "../../../database/connectDataBase";
import mongoose from "mongoose";
import { type UserStructure } from "../../../types";
import User from "../../../database/models/User";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/users/login' endpoint", () => {
  beforeAll(async () => {
    await User.create(fakeUser);
  });

  const mockUser: UserStructure = {
    username: "Diana",
    password: "12345678",
    email: "",
    avatar: "",
  };

  const fakeUser = {
    username: "Diana",
    password: "12345678",
    email: "hsdjfs",
  };

  const loginUrl = "/users/login";

  describe("When it receives a request with the name 'Diana' and password '123'", () => {
    test("Then it should return a status code 200", async () => {
      const expectedStatus = 200;
      const message = "";

      const response = await request(app)
        .post(loginUrl)
        .send(mockUser)
        .expect(expectedStatus);
    });
  });
});
