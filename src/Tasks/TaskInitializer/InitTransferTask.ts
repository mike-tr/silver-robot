import { roles } from "HiveMind/Spawner/UnitTamplates";
import { AddTask } from "Tasks/TaskAdder";

export interface InitTrasnferTask extends Task<"initTransfer"> {
    structureId: string,
}

export const InitTrasnferImplementation: TaskImplementation<InitTrasnferTask> = {
    CycleId: 0,
    name: "initTransfer",
    createTask(args: any) {
        this.CycleId++;
        const task: InitTrasnferTask = {
            workerType: roles.transferer,
            structureId: args.structureId,
            type: this.name,
            id: this.name + Game.time + this.CycleId,
            creep: "",
            tick: Game.time,
        }
        AddTask(task);
        return task;
    },

    taskRemoval(task) {

    },

    processTask(creep, task: InitTrasnferTask) {

    },

    is(task: Task<any>): task is InitTrasnferTask {
        return 'type' in task;
    }
}
