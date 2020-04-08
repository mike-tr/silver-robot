import { Hive } from "HiveMind/Hive";
import { CreepLogister } from "Creepers/CreepLogister";
import { Dictionary } from "lodash";
import { RoomData } from "Global/RoomExtra";

export class SVariables {
    public static hive: Hive;
    public static lcreeps: CreepLogister;
    public static rooms: Dictionary<RoomData> = {};

    public static roles = ["worker", "transferer", "attacker", "ranger", "claimer"]
}
