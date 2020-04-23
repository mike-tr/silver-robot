import { SVariables } from "Global/SVariables";
import { TaskRunner } from "Tasks/TaskRunner";
import { MinerImplementation } from "Tasks/Implementations/MinerTask";
import { HarvestImplementation } from "Tasks/Implementations/HarvestTask";
import { TrasnferImplementation } from "Tasks/Implementations/TransferTask";
import { WithdrawImplementation } from "Tasks/Implementations/WithdrawTask";
import { Spawner } from "./Spawner/Spawner";
import { initializeRoomData } from "Global/Room/Initializer";
import { InitMinerImplementation } from "Tasks/TaskInitializer/InitMinerTask";
import { populateTransferable } from "Global/Room/GetTransferable";
import { InitTrasnferImplementation } from "Tasks/TaskInitializer/InitTransferTask";
import { TaskRemoval } from "Tasks/TaskAdder";

export class Command {
    public name: string;
    public rooms: Room[];
    constructor(hname: string) {
        this.name = hname + Game.time;
        this.rooms = [];
        if (!Memory.command) {
            Memory.command = {
                tasks: {},
            }
        }

        this.AddImplementations();
        for (const name in Game.rooms) {
            const room = Game.rooms[name];
            if (room) {
                this.rooms.push(room);
                if (room.controller && room.controller.my) {
                    room.spawner = new Spawner(room);
                    initializeRoomData(room);
                    populateTransferable(room);
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
        SVariables.taskRunner.registerTaskImplementation(InitMinerImplementation);
        SVariables.taskRunner.registerTaskImplementation(InitTrasnferImplementation);

        TaskRemoval();
    }

    public run() {
        SVariables.lcreeps.getCreepsState();
        for (const room of this.rooms) {
            room.spawner.update();
        }
    }

    public getRoomTasks(room: Room) {

    }
}
