/// The core functionality of the application
import { createNotesTemplate } from "./notes/notes.ts";
import { Errorer } from "./utils/errors.ts";
import { parse, Args } from "https://deno.land/std@0.175.0/flags/mod.ts";

export interface SubCommand {
    args?: Args;
    description: string;
    err: Errorer;
    help(): void;
    execute(): void;
}

export class New implements SubCommand {
    args?: Args;
    description = "Generate new notes scaffold";
    err = new Errorer();

    constructor(args?: Args) {
        this.args = args;
        args?.help ?? this.help();
    }

    help() {
        console.log(`${this.description}`);
    }

    execute(): void {
        if (this.args == undefined) return;
        console.log(this.args["_"][0] + "execute");
    }
}

export class Build implements SubCommand {
    args?: Args;
    description = "Build the notes website";
    err = new Errorer();

    constructor(args?: Args) {
        this.args = args;
        args?.help ?? this.help();
    }

    help() {
        console.log(`${this.description}`);
    }

    execute(): void {
        if (this.args == undefined) return;
        console.log(this.args["_"][0] + "execute");
    }
}

export class Serve implements SubCommand {
    args?: Args;
    description = "Serves website for convenient editing";
    err = new Errorer();

    constructor(args?: Args) {
        this.args = args;
        args?.help ?? this.help();
    }

    help() {
        console.log(`${this.description}`);
    }

    execute(): void {
        if (this.args == undefined) return;
        console.log(this.args["_"][0] + "execute");
    }
}

export class Speed implements SubCommand {
    args?: Args;
    description = "?";
    err = new Errorer();

    constructor(args?: Args) {
        this.args = args;
        this.args?.help ?? this.help();
        if (this.args) {
            this.args["_"].length == 1 || this.err.error("'speed' does not take extra options");
        }
    }

    help() {
        console.log(`${this.description}`);
    }

    execute(): void {
        if (this.args == undefined) return;
        console.log("plash speed ㅋㅋㅋㅋㅋㅋ https://youtu.be/cEN00wMFB2A");
    }
}

export function actionBuild(options?: string[]): void {
    if (options !== undefined) {
        throw new Error("`build` takes no other options");
    }
    // Check if src directory is present, else error
    // Build site by copy src file structure, but converting .dj to .html
    console.log("[action] build");
    return;
}

export function actionSpeed(options?: string[]): void {
    if (options !== undefined) {
        throw new Error("`speed` takes no other options");
    }
    const runner = async () => {
        const p = Deno.run({
            cmd: ["pwsh", "-Command", "Start-Process", ""],
        });
        await p.status();
    }
    runner().then(() => console.log("plash speed ㅋㅋㅋㅋㅋㅋ")).catch(err => console.error(err));
    return;
}

export function actionServe(options?: string[]): void {
    if (options !== undefined && options[0] === "--options") {
        return;
    }

}