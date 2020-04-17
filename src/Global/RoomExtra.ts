import { SVariables } from "./SVariables";
import { roles } from "HiveMind/Spawner/UnitTamplates";
import { Dictionary } from "lodash";
import { MinerImplementation } from "Tasks/Implementations/MinerTask";

export interface RoomData {
    creepsByRole: Dictionary<Creep[]>;
    idlesByRole: Dictionary<Creep[]>;
    essential: CJob[];
    tasks: CJob[];
}

export function getRoomIdles(roomName: string): Dictionary<Creep[]> {
    return SVariables.rooms[roomName].idlesByRole;
}

export function getRoomCreeps(roomName: string): Dictionary<Creep[]> {
    return SVariables.rooms[roomName].creepsByRole;
}

export function getRoomEtasks(roomName: string): CJob[] {
    return SVariables.rooms[roomName].essential;
}

export function getRoomTasks(roomName: string): CJob[] {
    return SVariables.rooms[roomName].tasks;
}

export function initializeRoomData(room: Room) {
    if (room.controller && room.controller.my) {
        const data: RoomData = {
            creepsByRole: {},
            idlesByRole: {},
            essential: [],
            tasks: [],
        }
        const rmemory = room.memory;
        for (let key in roles) {
            data.creepsByRole[key] = [];
            data.idlesByRole[key] = [];
            rmemory.essential[key] = [];
            rmemory.taken[key] = [];
            rmemory.tasks[key] = [];
        }

        SVariables.rooms[room.name] = data;


        if (rmemory.sources === undefined) {
            const sources = room.find(FIND_SOURCES);
            sources.forEach((source) => {
                const task = MinerImplementation.createTask(source.id);
                rmemory.essential[task.type].push(task);
            });
        }

    }
}
