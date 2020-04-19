import { SVariables } from "Global/SVariables";
import { roles } from "HiveMind/Spawner/UnitTamplates";

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

        let rname = creep.room.controller && creep.room.controller.my ? creep.room.name : undefined;
        if (rname == undefined) {
            creep.suicide();
            return;
        }

        let creepM: CreepMemory = {
            task: {} as Task<"none">,
            role: "none",
            room: rname,
            working: false,
        };
        if (bodyParts.attack > 0) {
            creepM.role = roles.attacker;
        } else if (bodyParts.ranged_attack > 0) {
            creepM.role = roles.ranger;
        } else if (bodyParts.work > 0) {
            creepM.role = roles.worker;
        } else if (bodyParts.carry > 0) {
            creepM.role = roles.transferer;
        }
        Memory.creeps[creep.name] = creepM;

        creep.room.memory.creeps.push(creep.name);
    }
}
