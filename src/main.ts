import { ErrorMapper } from "utils/ErrorMapper";
import { Command } from "HiveMind/Command";
import { CreepLogister } from "Creepers/CreepLogister"
import { SVariables } from "Global/SVariables";

export class Main {
  public static run() {
    CreepLogister.updateCreeps();
    if (SVariables.hive === undefined) {
      SVariables.lcreeps = new CreepLogister();
      SVariables.hive = new Command("main");
    }
    SVariables.hive.run();
    console.log(`Current game tick is ${Game.time}`);
    // Automatically delete memory of missing creeps
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  let time = new Date().getTime();
  // for (let i = 0; i < 100; i++) {
  //   Main.run();
  // }
  Main.run();
  console.log((new Date().getTime() - time));
});
