import { MinerImplementation } from "Tasks/Implementations/MinerTask";
import { SVariables, bodyParts, tasks } from "Global/SVariables";
import { roles } from "HiveMind/Spawner/UnitTamplates";
import { RoomData } from "./RoomExtra";
import { HarvestImplementation, HarvestInitializer } from "Tasks/Implementations/HarvestTask";

export function initializeRoomData(room: Room) {
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
    }

    if (rmemory.tasks === undefined) {
        rmemory.tasks = {};
        rmemory.essential = {};
        rmemory.taken = {};
        for (let key in roles) {
            rmemory.essential[key] = [];
            rmemory.taken[key] = [];
            rmemory.tasks[key] = [];
        }
    }

    SVariables.rooms[room.name] = data;
    if (rmemory.sources === undefined) {
        rmemory.sources = [];
        const sources = room.find(FIND_SOURCES);
        sources.forEach((source) => {
            const mtask = MinerImplementation.createTask(source.id);
            const sdata: SourceData = {
                miner: "",
                id: source.id,
                task: [mtask],
                harvesters: [],
                productivity: 0,
                queued: false,
            }
            rmemory.sources.push(sdata);
        });
    } else {
        const sources = rmemory.sources;
        sources.forEach((source) => {
            let update = false;
            for (const name in source.harvesters) {
                if (!(name in Game.creeps)) {
                    delete source.harvesters[name];
                    update = true;
                }
            }
            if (!(source.miner in Game.creeps)) {

            }
            source.productivity = getSourceProductivity(source);
            if (source.productivity < 2500 && source.harvesters.length < 2 && !source.queued) {
                const harvestInit: HarvestInitializer = {
                    sourceId: source.id,
                    stopWhenFull: true,
                }
                const harvest = HarvestImplementation.createTask(harvestInit);
                rmemory.tasks[roles.worker].unshift(harvest);
                source.queued = true;
            }
        })
    }
}

export function getSourceProductivity(data: SourceData) {
    let work = 0;
    for (const name in data.harvesters) {
        const creep = Game.creeps[name];
        work += _.filter(creep.body, (bp) => {
            return bp.type === bodyParts.work
        }).length;
    }
    return work * 2 * 300;
}
