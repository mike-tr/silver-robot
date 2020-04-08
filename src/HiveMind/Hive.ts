import { SVariables } from "Global/SVariables";
import { initializeRoomData } from "Global/RoomExtra";

export class Hive {
    public name: string;
    public HiveM: HiveMemory;
    constructor(hname: string) {
        this.HiveM = Memory[hname];
        this.name = hname + Game.time;
        if (this.HiveM === undefined) {
            Memory[hname] = {
                global: {
                    tasks: {}
                }
            }
            this.HiveM = Memory[hname];
        }

        for (const name in Game.rooms) {
            const room = Game.rooms[name];
            if (room) {
                initializeRoomData(room);
            }
        }
    }

    public run() {
        SVariables.lcreeps.getCreepsState();
        for (const name in Game.rooms) {
            const roomM = Memory.rooms[name];
        }
    }

    public getRoomTasks(room: Room) {

    }
}
