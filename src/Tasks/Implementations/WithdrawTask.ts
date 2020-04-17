import { roles } from "HiveMind/Spawner/UnitTamplates";

export interface WithdrawTask extends Task<"withdraw"> {
    structureId: string,
}

export const WithdrawImplementation: TaskImplementation<WithdrawTask> = {
    name: "withdraw",
    createTask(args: any) {
        return {
            workerType: roles.worker,
            structureId: args.target,
            type: this.name,
        }
    },

    processTask(creep, task: WithdrawTask) {
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
            // find a place to store energy?
        }
    },

    is(task: Task<any>): task is WithdrawTask {
        return 'type' in task;
    }
}
