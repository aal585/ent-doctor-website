import { Service } from "encore.dev/service";
import { api } from "encore.dev/api";

const service = new Service("admin");

export default service;

export const hello = api<void, { message: string }>(
  { 
    method: "GET",
    path: "/hello",
    expose: true 
  },
  async () => {
    return { message: "Hello World" };
  }
);
