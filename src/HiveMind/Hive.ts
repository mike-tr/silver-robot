export class Hive {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }

    public run() {
        console.log("hive - " + this.name);
    }
}
