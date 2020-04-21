import { roles } from "HiveMind/Spawner/UnitTamplates";
import { AddTask } from "Tasks/TaskAdder";

export interface TrasnferTask extends Task<"transfer"> {
    structureId: string,
}

export const TrasnferImplementation: TaskImplementation<TrasnferTask> = {
    CycleId: 0,
    name: "transfer",
    createTask(args: any) {
        this.CycleId++;
        const task: TrasnferTask = {
            workerType: roles.transferer,
            structureId: args.structureId,
            type: this.name,
            id: this.name + Game.time + this.CycleId,
        }
        AddTask(task);
        return task;
    },

    processTask(creep, task: TrasnferTask) {
        const target = Game.structures[task.structureId];
        if (creep.carry.energy > 0) {
            const response = creep.transfer(target, RESOURCE_ENERGY);
            if (response === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {
                    reusePath: 25,
                    // visualizePathStyle: {stroke: '#ffffff'},
                    plainCost: 2,
                    swampCost: 3,
                });
            }
        } else {
            creep.memory.task = undefined;
            creep.memory.working = false;
        }
    },

    is(task: Task<any>): task is TrasnferTask {
        return 'type' in task;
    }
}
