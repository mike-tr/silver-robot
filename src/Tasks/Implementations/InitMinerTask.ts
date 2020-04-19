import { roles } from "HiveMind/Spawner/UnitTamplates";

export interface InitMinerTask extends Task<"iminer"> {
    sourceId: string,
    linkId: string,
    implementing: string,
    harvestPos: string,
}

export const InitMinerImplementation: TaskImplementation<InitMinerTask> = {
    name: "iminer",
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

    processTask(creep, task: InitMinerTask) {
        const room = creep.room;
    },

    is(task: Task<any>): task is InitMinerTask {
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
