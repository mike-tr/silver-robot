import { SVariables } from "./SVariables";
import { Dictionary } from "lodash";

export interface RoomData {
    creepsByRole: Dictionary<Creep[]>;
    idlesByRole: Dictionary<Creep[]>;
    essential: Task[];
    tasks: Task[];
}

export function getRoomIdles(roomName: string): Dictionary<Creep[]> {
    return SVariables.rooms[roomName].idlesByRole;
}

export function getRoomCreeps(roomName: string): Dictionary<Creep[]> {
    return SVariables.rooms[roomName].creepsByRole;
}

export function getRoomEtasks(roomName: string): Task[] {
    return SVariables.rooms[roomName].essential;
}

export function getRoomTasks(roomName: string): Task[] {
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
        SVariables.roles.forEach((role) => {
            data.creepsByRole[role] = [];
            data.idlesByRole[role] = [];
        });

        SVariables.rooms[room.name] = data;


    }
}
