import { SVariables } from "Global/SVariables";
import { TaskRunner } from "Tasks/TaskRunner";
import { MinerImplementation } from "Tasks/Implementations/MinerTask";
import { HarvestImplementation } from "Tasks/Implementations/HarvestTask";
import { TrasnferImplementation } from "Tasks/Implementations/TransferTask";
import { WithdrawImplementation } from "Tasks/Implementations/WithdrawTask";
import { Spawner } from "./Spawner/Spawner";
import { initializeRoomData } from "Global/Room/Initializer";

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
                if (room.controller && room.controller.my) {
                    room.spawner = new Spawner(room);
                    initializeRoomData(room);
                }
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


        }
    }

    public getRoomTasks(room: Room) {

    }
}
