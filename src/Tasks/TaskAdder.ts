import { Command } from "HiveMind/Command";
import { TaskRunner } from "./TaskRunner";
import { SVariables } from "Global/SVariables";

export function AddTask(task: Task<any>) {
    console.log("added new task + " + task.type + " id :" + task.id);
    Memory.command.tasks[task.id] = task;
}

export function GetTask(taskID: string): Task<any> {
    return Memory.command.tasks[taskID];
}

export function RemoveTask(task: Task<any>) {
    console.log(task.id);
    SVariables.taskRunner.removeTask(task);
    delete Memory.command.tasks[task.id];
}

export function TaskRemoval() {
    for (const taskId in Memory.command.tasks) {
        const task = Memory.command.tasks[taskId];
        console.log(taskId);
        console.log(JSON.stringify(task));
        if (task.creep) {
            if (!(task.creep in Game.creeps)) {
                RemoveTask(task);
            }
        } else if (Game.time - task.tick > 2000) {
            RemoveTask(task);
        }
    }
}
