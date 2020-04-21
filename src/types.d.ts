// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  [name: string]: any;
  role: string;
  room: string;
  task?: string;
  cost: number,
  working: boolean;
}

interface Creep {
  tickData: any;
}

interface Pos {
  x: number,
  y: number,
  roomName: string,
}

interface CJob {
  targetsID: string[];
  taskName: string;
  taskIndex: number;
  taskList: number[];
  creep: string;
}

interface Memory {
  command: HiveMemory,
  uuid: number;
  log: any;
}

interface HiveMemory {
  tasks: Dictionary<Task<any>>
}

interface FlagMemory {
  [name: string]: any;
}

interface PowerCreepMemory {
  [name: string]: any;
}

interface UnitTemplate {
  readonly type: string,
  readonly minBody: BodyPartConstant[],
  readonly upgrade: BodyExtended[],
  readonly max: number,
}

interface BodyExtended {
  readonly part: BodyPartConstant,
  readonly ratio: number,
}

interface RoomMemory {
  [name: string]: any;
  sources: SourceData[];
  spawner: SpwanerData;
  tasks: Dictionary<string[]>;
  essential: Dictionary<string[]>;
  taken: Dictionary<string[]>;
  creeps: string[];
  transferable: Dictionary<Transferable>;
}

interface Transferable {
  structureID: string,
  transactions: number,
}

interface SpwanerData {
  queue: CreepSpawnRequest[],
  units: Dictionary<number>;
  totalUnits: number,
}

interface CreepSpawnRequest {

}

interface SourceData {
  task: string[],
  harvesters: string[],
  id: string,
  miner: string,
  productivity: number,
  queued: boolean,
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

interface Room {
  spawner: import("./HiveMind/Spawner/Spawner").Spawner;
}

interface Dictionary<T> {
  [index: string]: T;
}
