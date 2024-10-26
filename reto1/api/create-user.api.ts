export const createUser = async (request, userData, baseURL) => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const userToCreate = {
    userName: `${randomString}_${userData.username}`,
    password: userData.password,
  };
  const response = await request.post(`${baseURL}/Account/v1/User`, {
    data: userToCreate,
  });
  return { response, user: userToCreate };
}

