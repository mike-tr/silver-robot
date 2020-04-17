export const tasks = {

}

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
}
