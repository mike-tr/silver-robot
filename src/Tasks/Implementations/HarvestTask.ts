import { roles } from "HiveMind/Spawner/UnitTamplates";
import { AddTask, RemoveTask } from "Tasks/TaskAdder";

export interface HarvestTask extends Task<"harvest"> {
    sourceId: string,
    readonly stopWhenFull: boolean,
}

export interface HarvestInitializer extends TaskInitializer<HarvestTask> {
    sourceId: string,
    stopWhenFull: boolean,
}

export const HarvestImplementation: TaskImplementation<HarvestTask> = {
    CycleId: 0,
    name: "harvest",
    createTask(args: HarvestInitializer) {
        this.CycleId++;
        const task = {
            workerType: roles.miner,
            sourceId: args.sourceId,
            stopWhenFull: args.stopWhenFull,
            type: this.name,
            id: this.name + Game.time + this.CycleId,
            creep: undefined,
            tick: Game.time,
        }
        AddTask(task);
        return task;
    },

    taskRemoval(task) {

    },

    processTask(creep, task: HarvestTask) {
        const target = Game.getObjectById(task.sourceId) as Source;
        const response = creep.harvest(target);
        if (response === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                reusePath: 25,
                // visualizePathStyle: {stroke: '#ffffff'},
                plainCost: 2,
                swampCost: 3,
            });
        }

        if (task.stopWhenFull && creep.carry.energy >= creep.carryCapacity) {
            RemoveTask(task);

        }
    },

    is(task: Task<any>): task is HarvestTask {
        return 'type' in task;
    }
}

// export class MinerImplementation implements TaskImplementation<Task<"miner">>{
//     public name: "miner";
//     public processTask(creep: Creep, task: MinerTask) {
//         const target = Game.resources[task.sourceId];
//         creep.harvest(target);
//     }
// }
