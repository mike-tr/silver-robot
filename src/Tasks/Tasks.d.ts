interface Task<T extends string> {
    readonly type: T,
    readonly workerType: string,
}

type TaskType<T extends Task<any>> = T extends Task<infer U> ? U : never

interface TaskImplementation<T extends Task<any>> {
    readonly name: TaskType<T>,
    processTask(creep: Creep, task: Task<any>): void;
    createTask(args: any): T
    is(task: Task<any>): task is T,
}
