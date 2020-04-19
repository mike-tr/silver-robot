import { roles, unitTemplates } from "./UnitTamplates";
import { generateUnit } from "./UnitSpawner";

export const minUnits: {
    [name: string]: number
} = {
    worker: 2,
    transferer: 1,
    miner: 1,
}

export class Spawner {
    public room: Room;
    public data: SpwanerData;
    public minEnergy: number;
    public spawns: StructureSpawn[];
    constructor(room: Room) {
        this.room = room;
        this.data = room.memory.spawner
        if (this.data === undefined) {
            this.data = {
                queue: [],
                units: {},
                totalUnits: 0,
            }
            room.memory.spawner = this.data;
        }

        this.minEnergy = 300;
        if (this.data.totalUnits > 2) {
            this.minEnergy = this.room.energyCapacityAvailable;
            if (this.minEnergy > 1500) {
                this.minEnergy = 1500;
            } else if (this.minEnergy > 800) {
                this.minEnergy *= 0.8;
            }
        }
        this.reset();
        this.spawns = this.room.find(FIND_MY_SPAWNS);
    }

    public update() {
        if (this.room.energyAvailable >= this.minEnergy) {
            console.log(this.room.energyAvailable);
            for (const key in minUnits) {
                console.log(key + " : " + minUnits[key]);
                if (minUnits[key] > this.data.units[key]) {
                    // || (key === roles.miner && this.data.units[key] < this.room.memory.sources.length)
                    console.log(key + " : " + this.data.units[key]);
                    const unit = generateUnit(this.room.energyAvailable, unitTemplates[key]);
                    console.log('cost : ' + unit.cost)
                    this.spawns.forEach((spawn) => {
                        if (spawn.isActive && !spawn.spawning) {
                            const response = spawn.spawnCreep(unit.body, key + "_" + Game.time, {
                                memory: {
                                    task: {} as Task<"none">,
                                    role: key,
                                    room: this.room.name,
                                    working: false,
                                }
                            });

                            if (response === OK) {
                                this.data.units[key]++;
                                this.data.totalUnits++;
                                return;
                            }
                        }
                    });
                }
            }
        }
    }

    public reset() {
        this.data.units = {};
        this.data.totalUnits = 0;
        for (let role in roles) {
            this.data.units[role] = 0;
        }

        for (const name in this.room.memory.creeps) {
            const creep = Game.creeps[name];
            if (creep) {
                this.data.units[creep.memory.role]++;
                this.data.totalUnits++;
            }
        }
    }
}
