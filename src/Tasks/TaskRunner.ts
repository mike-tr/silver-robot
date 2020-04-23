export class TaskRunner {
    private implementations: { [name: string]: TaskImplementation<any> } = {};

    public registerTaskImplementation(implementation: TaskImplementation<any>) {
        this.implementations[implementation.name] = implementation;
    }

    public processTask(creep: Creep, task: Task<any>) {
        if (this.implementations[task.type]) {
            return this.implementations[task.type].processTask(creep, task);
        } else {
            throw Error(`Unknown task type "${task.type}"`);
        }
    }

    public removeTask(task: Task<any>) {
        if (this.implementations[task.type]) {
            return this.implementations[task.type].taskRemoval(task);
        } else {
            throw Error(`Unknown task type "${task.type}"`);
        }
    }
}
