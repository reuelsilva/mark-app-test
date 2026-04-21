import { APIRequestContext, expect } from "@playwright/test";
import { taskModel } from "../fixtures/taskModel";

import dotenv from "dotenv";
dotenv.config();

const BASE_API = process.env.BASE_API;

export const deleteTaskViaApiHelper = async (request: APIRequestContext, taskName: string) => {
    await request.delete(`${BASE_API}/helper/tasks/${taskName}`);
}

export const postTask = async (request: APIRequestContext, task: taskModel) => {
    const newTask = await request.post(`${BASE_API}/tasks`, {
        data: task
    })
    await expect(newTask.ok()).toBeTruthy();
}