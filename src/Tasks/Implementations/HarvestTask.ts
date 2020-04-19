import { roles } from "HiveMind/Spawner/UnitTamplates";

export interface HarvestTask extends Task<"harvest"> {
    sourceId: string,
    readonly stopWhenFull: boolean,
}

export interface HarvestInitializer extends TaskInitializer<HarvestTask> {
    sourceId: string,
    stopWhenFull: boolean,
}

export const HarvestImplementation: TaskImplementation<HarvestTask> = {
    name: "harvest",
    createTask(args: HarvestInitializer) {
        return {
            workerType: roles.miner,
            sourceId: args.sourceId,
            stopWhenFull: args.stopWhenFull,
            type: this.name,
        }
    },

    processTask(creep, task: HarvestTask) {
        const target = Game.resources[task.sourceId];
        const response = creep.harvest(target);
        if (response === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                reusePath: 25,
                // visualizePathStyle: {stroke: '#ffffff'},
                plainCost: 2,
                swampCost: 3,
            });
        }

        if (creep.carry.energy >= creep.carryCapacity) {

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
