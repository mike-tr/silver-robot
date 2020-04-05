import { ErrorMapper } from "utils/ErrorMapper";
import { Hive } from "HiveMind/Hive";

export class Main {
  public static run() {
    const hive = new Hive("test");
    hive.run();
    console.log(`Current game tick is ${Game.time}`);
    // Automatically delete memory of missing creeps
    console.log(JSON.stringify(Memory.creeps));
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
        continue;
      }

      const creep = Game.creeps[name];
      console.log(JSON.stringify(Memory.creeps[name]))
      console.log(JSON.stringify(creep.body));
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  Main.run();
});
