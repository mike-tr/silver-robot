import { roles } from "./UnitTamplates";
import { forEach } from "lodash";

export class Spawner {
    public room: Room;
    public data: SpwanerData;
    constructor(room: Room) {
        this.room = room;
        this.data = room.memory.spawner
        if (this.data === undefined) {
            this.data = {
                queue: [],
                units: {},
            }
            room.memory.spawner = this.data;
        }
    }

    public update() {

    }

    public reset() {
        this.data.units = {};
        for (let role in roles) {
            this.data.units[role] = 0;
        }

        for (const name in this.room.memory.creeps) {
            const creep = Game.creeps[name];
            this.data.units[creep.memory.role]++;
        }
    }
}
