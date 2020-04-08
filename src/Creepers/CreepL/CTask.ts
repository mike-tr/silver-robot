export const taskIds = {
    1: "harvest",
    2: "linkHarvest",
}

export const taskIds2: {
    [id: number]: string;
} = {
    1: "harvest",
    2: "linkHarvest",
};

export class CTask {
    public static doTask(creep: Creep) {
        const task = creep.memory.task;
        // this[taskIds2[creep.memory.task]]();
        switch (task.taskID) {
            case 1:
                return this.harvest(creep, task);
            case 2:
                return this.linkHarvest(creep, task);
        }
    }

    public static harvest(creep: Creep, task: Task) {

    }

    public static linkHarvest(creep: Creep, task: Task) {

    }
}
