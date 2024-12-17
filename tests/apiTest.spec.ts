import { test, expect } from "@playwright/test";

type UserDetail = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type Support = {
  url: string;
  text: string;
};

type UserDetailsResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserDetail[];
  support: Support;
};

type CreateUserBody = {
  name: string;
  job: string;
};

type UpdateUserBody = CreateUserBody;

type UpdatedUser = UpdateUserBody & {
  updatedAt: Date;
};

type CreatedUser = CreateUserBody & {
  id: number;
  createdAt: Date;
};

let createdUserId: number = 0;

test("Get user details using GET API", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");
  const responseJSON: UserDetailsResponse = await response.json();
  console.log(responseJSON);
  expect(response.status()).toBe(200);
  expect(responseJSON.total).toBe(12);
  expect(responseJSON.data[0].first_name).toBe("Michael");
});

test("Create user using POST API", async ({ request }) => {
  const payload: CreateUserBody = {
    name: "Michael",
    job: "Engineer",
  };
  const response = await request.post("https://reqres.in/api/users", {
    data: payload,
    headers: {
      Accept: "application/json",
    },
  });
  const responseJSON: CreatedUser = await response.json();
  expect(response.status()).toBe(201);
  expect(responseJSON.name).toBe(payload.name);
  expect(responseJSON.job).toBe(payload.job);
  expect(responseJSON.id).toBeTruthy();
  createdUserId = responseJSON.id;
});

test("Update user using PUT API", async ({ request }) => {
  const updatePayload: UpdateUserBody = {
    name: "Michael Updated",
    job: "Engineer Updated",
  };
  const response = await request.put(
    `https://reqres.in/api/users/${createdUserId}`,
    {
      data: updatePayload,
      headers: {
        Accept: "application/json",
      },
    }
  );
  const responseJSON: UpdatedUser = await response.json();
  expect(response.status()).toBe(200);
  expect(responseJSON.name).toBe(updatePayload.name);
  expect(responseJSON.job).toBe(updatePayload.job);
});

test("Delete user using DELETE API", async ({ request }) => {
  const responseDelete = await request.delete(
    `https://reqres.in/api/users/${createdUserId}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  expect(responseDelete.status()).toBe(204);
});
