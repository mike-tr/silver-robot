import { SVariables } from "Global/SVariables";
import { initializeRoomData } from "Global/RoomExtra";
import { TaskRunner } from "Tasks/TaskRunner";
import { MinerImplementation } from "Tasks/Implementations/MinerTask";
import { HarvestImplementation } from "Tasks/Implementations/HarvestTask";
import { TrasnferImplementation } from "Tasks/Implementations/TransferTask";
import { WithdrawImplementation } from "Tasks/Implementations/WithdrawTask";

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

        this.AddImplementations();

        for (const name in Game.rooms) {
            const room = Game.rooms[name];
            if (room) {
                initializeRoomData(room);

            }
        }
    }

    public AddImplementations() {
        SVariables.taskRunner = new TaskRunner()
        SVariables.taskRunner.registerTaskImplementation(MinerImplementation);
        SVariables.taskRunner.registerTaskImplementation(HarvestImplementation);
        SVariables.taskRunner.registerTaskImplementation(TrasnferImplementation);
        SVariables.taskRunner.registerTaskImplementation(WithdrawImplementation);
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
