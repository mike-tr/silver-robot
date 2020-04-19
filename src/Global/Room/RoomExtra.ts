import { SVariables } from "../SVariables";
import { roles } from "HiveMind/Spawner/UnitTamplates";
import { Dictionary } from "lodash";
import { MinerImplementation } from "Tasks/Implementations/MinerTask";

export function roomPosToPos(roomPos: RoomPosition): Pos {
    return { x: roomPos.x, y: roomPos.y, roomName: roomPos.roomName };
}

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
