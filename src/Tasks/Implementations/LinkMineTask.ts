import { AddTask } from "Tasks/TaskAdder";

export interface LinkMinerTask extends Task<"linkMiner"> {
    sourceId: string,
    linkId: string,
}

export const LinkMinerImplementation: TaskImplementation<LinkMinerTask> = {
    CycleId: 0,
    name: "linkMiner",
    createTask(args: any) {
        this.CycleId++;
        const task = {
            workerType: "none",
            linkId: args.link,
            sourceId: args.source,
            type: this.name,
            id: this.name + Game.time + this.CycleId,
        }
        AddTask(task);
        return task;
    },

    processTask(creep, task: LinkMinerTask) {
        const target = Game.resources[task.sourceId];
        creep.harvest(target);
        if (creep.carry.energy > 30) {
            creep.transfer(Game.structures[task.linkId], RESOURCE_ENERGY);
        }
    },

    is(task: Task<any>): task is LinkMinerTask {
        return 'type' in task;
    }
}
