import { roles } from "HiveMind/Spawner/UnitTamplates";

export interface MinerTask extends Task<"miner"> {
    sourceId: string,
    linkId?: string,
}

export const MinerImplementation: TaskImplementation<MinerTask> = {
    name: "miner",
    createTask(source: string) {
        return {
            linkId: undefined,
            sourceId: source,
            type: this.name,
            workerType: roles.miner,
        }
    },

    processTask(creep, task: MinerTask) {
        const target = Game.getObjectById(task.sourceId) as Source;
        creep.harvest(target);
        if (task.linkId && creep.carry.energy > 30) {
            creep.transfer(Game.getObjectById(task.linkId) as Structure, RESOURCE_ENERGY);
        }
    },

    is(task: Task<any>): task is MinerTask {
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
