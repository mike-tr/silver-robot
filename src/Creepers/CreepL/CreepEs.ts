export class CreepEs {
    public static createMemory(creep: Creep) {
        let bodyParts: any = {};
        creep.body.forEach((part) => {
            if (bodyParts[part.type] === undefined) {
                bodyParts[part.type] = 1;
            } else {
                bodyParts[part.type] += 1;
            }
        });

        let creepM: CreepMemory = {
            task: {
                targetsID: [],
                taskID: 0,
            },
            role: "none",
            room: creep.room.name,
            working: false,
        };
        if (bodyParts.attack > 0) {
            creepM.role = "attacker";
        } else if (bodyParts.ranged_attack > 0) {
            creepM.role = "ranger";
        } else if (bodyParts.work > 0) {
            creepM.role = "worker"
        } else if (bodyParts.carry > 0) {
            creepM.role = "transferer";
        }
        Memory.creeps[creep.name] = creepM;
    }
}
