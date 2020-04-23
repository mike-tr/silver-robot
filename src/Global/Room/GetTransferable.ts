import { GetTask } from "Tasks/TaskAdder";
import { TrasnferTask } from "Tasks/Implementations/TransferTask";

export function populateTransferable(room: Room) {
    let transferO = room.memory.transferables;
    if (!transferO || transferO.update > 5) {
        const structures = room.find(FIND_MY_STRUCTURES, {
            filter: (structure: Structure) => {
                return structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN;
            }
        })
        if (!transferO) {
            transferO = {
                structures: {},
                update: 0,
            }
            room.memory.transferables = transferO;
        } else {
            transferO.update = 0;
        }

        structures.forEach((structure) => {
            const ts = transferO.structures[structure.id];
            if (!ts) {
                transferO.structures[structure.id] = {
                    structureID: structure.id,
                    transactions: 0,
                    tasks: {},
                }
            }
        });
    }
}
