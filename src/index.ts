import { Program } from "./cli/program.ts";
import { Cli, Actions } from "./cli/cli.ts";
import { createNotesTemplate } from "./notes/notes.ts";

function actionNew(options?: string[]): void {
    if (options === undefined || options.length == 0) {
        throw new Error("missing root `dir` for notes");
    } else if (options.length > 1) {
        throw new Error("too many options for root `dir`, only 1 is required");
    }
    const dir = options[0];
    createNotesTemplate(dir);
    return;
}

function actionBuild(options?: string[]): void {
    if (options !== undefined) {
        throw new Error("`build` takes no other options");
    }
    // Check if src directory is present, else error
    // Build site by copy src file structure, but converting .dj to .html
    console.log("[action] build");
    return;
}

function actionSpeed(options?: string[]): void {
    if (options !== undefined) {
        throw new Error("`speed` takes no other options");
    }
    const runner = async () => {
        const p = Deno.run({
            cmd: ["pwsh", "-Command", "Start-Process", "https://youtu.be/cEN00wMFB2A"],
        });
        await p.status();
    }
    runner().then(() => console.log("plash speed ㅋㅋㅋㅋㅋㅋ")).catch(err => console.error(err));
    return;
}

function main(program: Program) {
    const actions: Actions = {
        "new": {fn: (options) => actionNew(options), help: "Generate new notes scaffold"},
        "build": {fn: () => actionBuild(), help: "build notes website"},
        "serve": {fn: () => {}, help: "serves website for convenient editing"},
        "speed": {fn: () => actionSpeed(), help: "?"},
    }
    const cli = new Cli(program, actions);
    cli.run();
}

const program: Program = {
    name: "plash speed",
    version: 0.1,
}

main(program);