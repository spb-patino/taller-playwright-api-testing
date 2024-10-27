import { APIRequestContext, APIResponse } from "@playwright/test";

import { UserCredentials } from "../types/user-credentials.type";
import { DEMOQA_URL } from "../data/test.data";

export const createUser = async (request: APIRequestContext, userDummy: UserCredentials):
  Promise<{response: APIResponse, newUserAccount: UserCredentials}> => {

  const randomString = Math.random().toString(36).substring(2, 10);

  const userToCreate = {
    userName: `${userDummy.userName}_${randomString}`,
    password: userDummy.password,
  };

  const response = await request.post(`${DEMOQA_URL}/Account/v1/User`, {
    data: userToCreate,
  });

  return { response, newUserAccount: { ...userToCreate } };
}