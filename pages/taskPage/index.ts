import { expect, Locator, Page } from "@playwright/test";
import { taskModel } from "../../tests/fixtures/taskModel";

export class TaskPage {

    readonly page: Page;
    readonly inputNewTask:  Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputNewTask = page.locator('#newTask');
    }

    async go() {
        await this.page.goto('/');
    }

    async registerNewTask(task: taskModel) {
        await this.inputNewTask.fill(task.name);
        await this.page.click('button[class*=ButtonNewTask]');
    }

    async removeTask(taskName:string){
        const taskItem = this.page.locator('[data-testid="task-item"]', {hasText: taskName}).locator('button[class*="DeleteButton"]');
        await taskItem.click();
    }

    async toggleTask(taskName: string){
        const taskItem = this.page.locator('[data-testid="task-item"]', {hasText: taskName}).locator('button[class*="_listItemToggle"]');
        await taskItem.click();
    }

    async shouldHaveTask(taskName: string) {
        const taskItem = this.page.locator(`css=.task-item p >> text=${taskName}`);
        await expect(taskItem).toBeVisible();
    }

    async shouldNotHaveTask(taskName: string){
        const taskItem = this.page.locator(`css=.task-item p >> text=${taskName}`);
        await expect(taskItem).not.toBeVisible();
    }

    async shouldAlertHaveText(text: string) {
        const alert = this.page.locator('#swal2-html-container');
        await expect(alert).toHaveText(text);
    }

    async shouldTaskBeDone(taskName: string){
       const taskText = this.page.getByText(taskName);
       await expect(taskText).toHaveCSS('text-decoration-line', 'line-through')
    }
}