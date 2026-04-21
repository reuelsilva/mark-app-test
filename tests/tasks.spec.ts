import { expect, test } from '@playwright/test';

import { taskModel } from './fixtures/taskModel';
import { deleteTaskViaApiHelper, postTask } from './helpers/helpers';
import { TaskPage } from '../pages/taskPage';

import data from './fixtures/tasks.json';

let onTaskPage: TaskPage;

test.beforeEach(({ page }) => {
    onTaskPage = new TaskPage(page);
})

test('Deve poder cadastrar uma nova tarefa', async ({ request }) => {
    const task: taskModel = data.success;

    await deleteTaskViaApiHelper(request, task.name);

    await onTaskPage.go();
    await onTaskPage.registerNewTask(task);
    await onTaskPage.shouldHaveTask(task.name);
})

test('Não deve permitir tarefa duplicada', async ({ request }) => {
    const task: taskModel = data.duplicated;

    await deleteTaskViaApiHelper(request, task.name);
    await postTask(request, task);

    await onTaskPage.go();
    await onTaskPage.registerNewTask(task);
    await onTaskPage.shouldAlertHaveText('Task already exists!');
})

test('Deve exibir campo obrigatório', async () => {
    const task: taskModel = data.required;

    await onTaskPage.go();
    await onTaskPage.registerNewTask(task);

    const validationMessage = await onTaskPage.inputNewTask.evaluate(e => (e as HTMLInputElement).validationMessage);

    expect(validationMessage).toEqual('This is a required field');
})

test('Deve marcar uma tarefa como concluída', async ({ request }) => {
    const task: taskModel = data.updated;

    await deleteTaskViaApiHelper(request, task.name);
    await postTask(request, task);

    await onTaskPage.go();

    await onTaskPage.toggleTask(task.name);
    await onTaskPage.shouldTaskBeDone(task.name);
})

test('Deve remover uma tarefa', async ({ request }) => {
    const task: taskModel = data.delete;
    
    await deleteTaskViaApiHelper(request, task.name);
    await postTask(request, task);

    await onTaskPage.go();
    await onTaskPage.removeTask(task.name);
    await onTaskPage.shouldNotHaveTask(task.name);
})