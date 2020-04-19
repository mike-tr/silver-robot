import { bodyParts } from "Global/SVariables";

export const roles = {
    worker: "worker",
    transferer: "transferer",
    attacker: "attacker",
    ranger: "ranger",
    claimer: "claimer",
    miner: "miner"
}

export const unitTemplates: {
    [index: string]: UnitTemplate,
} = {
    miner: {
        type: roles.miner,
        minBody: [bodyParts.carry, bodyParts.move, bodyParts.work, bodyParts.work],
        upgrade: [{ part: bodyParts.work, ratio: 2 }, { part: bodyParts.move, ratio: 0.5 }],
        max: 3,
    },

    worker: {
        type: roles.worker,
        minBody: [bodyParts.carry, bodyParts.move, bodyParts.work, bodyParts.work],
        upgrade: [{ part: bodyParts.work, ratio: 1.5 }, { part: bodyParts.carry, ratio: 0.75 }, { part: bodyParts.move, ratio: 1 }],
        max: 10,
    },

    transferer: {
        type: roles.transferer,
        minBody: [bodyParts.carry, bodyParts.carry, bodyParts.move],
        upgrade: [{ part: bodyParts.carry, ratio: 1.5 }, { part: bodyParts.move, ratio: 1 }],
        max: 8,
    }
}
