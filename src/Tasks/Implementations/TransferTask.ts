import { roles } from "HiveMind/Spawner/UnitTamplates";
import { AddTask, RemoveTask } from "Tasks/TaskAdder";
import { Command } from "HiveMind/Command";
import { getStructureData } from "Global/Room/RoomExtra";

export interface TrasnferTask extends Task<"transfer"> {
    structureId: string,
    amount: number,
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
            creep: args.creep,
            tick: Game.time,
            amount: args.amount,
        }
        const sd = getStructureData(Game.structures[task.structureId]);
        sd.transactions += task.amount;
        sd.tasks[task.structureId] = task.structureId;

        AddTask(task);
        return task;
    },

    taskRemoval(task: TrasnferTask) {
        const target = Game.structures[task.structureId];
        if (target) {
            const sd = getStructureData(target);
            sd.transactions -= task.amount;
            delete sd.tasks[task.id];
        }
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
            RemoveTask(task);
            creep.memory.task = undefined;
            creep.memory.working = false;
        }
    },

    is(task: Task<any>): task is TrasnferTask {
        return 'type' in task;
    }
}
