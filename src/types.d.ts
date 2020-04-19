// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  [name: string]: any;
  role: string;
  room: string;
  task: Task<any>;
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
  tasks: Dictionary<Task<any>[]>;
  essential: Dictionary<Task<any>[]>;
  taken: Dictionary<Task<any>[]>;
  creeps: string[];
}

interface SpwanerData {
  queue: CreepSpawnRequest[],
  units: Dictionary<number>;
  totalUnits: number,
}

interface CreepSpawnRequest {

}

interface SourceData {
  task: Task<any>[],
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
