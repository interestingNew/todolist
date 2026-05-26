import axios from "axios";

const token = "a9fdcf8a-a011-4161-a0d5-044789fd803b";
const apiKey = "569a9845-83fa-42f4-b2bd-1478d35186f6";

export const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1",
   headers: {
      Authorization: `Bearer ${token}`,
      "API-KEY": apiKey,
   },
});
