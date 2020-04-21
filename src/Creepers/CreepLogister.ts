import { CreepEs } from "./CreepL/CreepES";
import { SVariables } from "Global/SVariables";
import { Dictionary } from "lodash";
import { roles } from "HiveMind/Spawner/UnitTamplates";
import { InitMinerImplementation } from "Tasks/Implementations/InitMinerTask";
import { GetTask } from "Tasks/TaskAdder";

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

    public static updateCreeps() {
        for (const name in Memory.creeps) {
            const memory = Memory.creeps[name];
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
                const creeps = Game.rooms[memory.room].memory.creeps;
                creeps.splice(creeps.indexOf(name), 1);
            }
        }
    }

    public getCreepsState() {
        for (const name in Memory.creeps) {
            const memory = Memory.creeps[name];
            SVariables.rooms[memory.room].creepsByRole[memory.role].push(Game.creeps[name]);
            const creep = Game.creeps[name];
            if (!memory.task) {
                SVariables.rooms[memory.room].idlesByRole[memory.role].push(Game.creeps[name]);
                if (memory.role === roles.miner) {
                    memory.task = InitMinerImplementation.createTask({}).id;
                    memory.working = true;
                }
            } else {
                SVariables.taskRunner.processTask(creep, GetTask(memory.task));
            }
        }
    }

}
