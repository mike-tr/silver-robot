interface Task<T extends string> {
    readonly type: T,
    readonly workerType: string,
    readonly id: string,
    creep?: string,
    tick: number,
}

type TaskType<T extends Task<any>> = T extends Task<infer U> ? U : never

interface TaskInitializer<T extends Task<any>> {

}

interface TaskImplementation<T extends Task<any>> {
    CycleId: number;
    readonly name: TaskType<T>,
    processTask(creep: Creep, task: Task<any>): void;
    createTask(args: TaskInitializer<T>): T
    taskRemoval(task: T): void;
    is(task: Task<any>): task is T,
}

