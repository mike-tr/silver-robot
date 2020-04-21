export function populateTransferable(room: Room) {
    const structures = room.find(FIND_MY_STRUCTURES, {
        filter: (structure: Structure) => {
            return structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN;
        }
    })

    room.memory.transferable = {};
    structures.forEach((structure) => {
        room.memory.transferable[structure.id] = {
            structureID: structure.id,
            transactions: 0,
        }
    });
}
