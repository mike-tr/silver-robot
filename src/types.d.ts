// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  [name: string]: any;
  role: string;
  room: string;
  task: Task;
  working: boolean;
}

interface Creep {
  tickData: any;
}

interface Task {
  targetsID: string[];
  taskID: number;
}

interface Memory {
  [name: string]: any;
  uuid: number;
  log: any;
}

interface HiveMemory {
  cycle_tick: number;
  global: any;
}

interface FlagMemory {
  [name: string]: any;
}
interface PowerCreepMemory {
  [name: string]: any;
}
interface RoomMemory {
  [name: string]: any;
}
interface SpawnMemory {
  [name: string]: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
