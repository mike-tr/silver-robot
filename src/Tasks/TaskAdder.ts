import { Command } from "HiveMind/Command";

export function AddTask(task: Task<any>) {
    console.log("added new task + " + task.type + " id :" + task.id);
    Memory.command.tasks[task.id] = task;
}

export function GetTask(taskID: string): Task<any> {
    return Command.memory.tasks[taskID];
}
