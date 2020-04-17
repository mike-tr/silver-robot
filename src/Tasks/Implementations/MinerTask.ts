import { roles } from "HiveMind/Spawner/UnitTamplates";

export interface MinerTask extends Task<"miner"> {
    sourceId: string,
    linkId: string,
    implementing: string,
    harvestPos: string,
}

export const MinerImplementation: TaskImplementation<MinerTask> = {
    name: "miner",
    createTask(source: string) {
        return {
            harvestPos: "",
            linkId: "",
            implementing: "",
            sourceId: source,
            type: this.name,
            workerType: roles.miner,
        }
    },

    processTask(creep, task: MinerTask) {
        const target = Game.resources[task.sourceId];
        creep.harvest(target);
        if (creep.carry.energy > 30) {
            creep.transfer(Game.structures[task.linkId], RESOURCE_ENERGY);
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
