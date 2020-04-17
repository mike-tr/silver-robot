import { SVariables, bodyParts } from "Global/SVariables";
import { bodyCost } from "./UnitSpawner";

export const roles = {
    worker: "worker",
    transferer: "transferer",
    attacker: "attacker",
    ranger: "ranger",
    claimer: "claimer",
    miner: "miner"
}

export const minUnits = {
    worker: 2,
    transferer: 1,
    miners: 1,
}

const unitTemplates: {
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
        minBody: [bodyParts.carry, bodyParts.move, bodyParts.move, bodyParts.work],
        upgrade: [{ part: bodyParts.work, ratio: 1 }, { part: bodyParts.carry, ratio: 0.5 }, { part: bodyParts.move, ratio: 0.5 }],
        max: 10,
    },

    transferer: {
        type: roles.transferer,
        minBody: [bodyParts.carry, bodyParts.carry, bodyParts.move],
        upgrade: [{ part: bodyParts.carry, ratio: 1.5 }, { part: bodyParts.move, ratio: 1 }],
        max: 8,
    }
}
