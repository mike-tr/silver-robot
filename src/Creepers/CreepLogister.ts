import { CreepEs } from "./CreepL/CreepES";
import { SVariables } from "Global/SVariables";
import { Dictionary } from "lodash";

export class CreepLogister {
    constructor() {
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.my) {
                if (Memory.creeps[name] === undefined) {
                    CreepEs.createMemory(creep);
                }
            }
        }
    }

    public getCreepsState() {
        for (const name in Memory.creeps) {
            const memory = Memory.creeps[name];
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
                const creeps = Game.rooms[memory.room].memory.creeps;
                creeps.splice(creeps.indexOf(name), 1);
                continue;
            }

            SVariables.rooms[memory.room].creepsByRole[memory.role].push(Game.creeps[name]);

            if (!memory.working) {
                SVariables.rooms[memory.room].idlesByRole[memory.role].push(Game.creeps[name]);
            } else {

            }
        }
    }

}
