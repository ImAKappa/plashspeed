/// Entry point to the executable

import { Program } from "./cli/program.ts";
import { Cli, Actions } from "./cli/cli.ts";
import { AppAction } from "./app.ts";

function main(program: Program) {
    const app = new AppAction();
    const actions: Actions = {
        "new": {fn: app.new, help: "Generate new notes scaffold"},
        "build": {fn: app.build, help: "build notes website"},
        "serve": {fn: app.serve, help: "serves website for convenient editing"},
        "speed": {fn: app.speed, help: "?"},
    }
    const cli = new Cli(program, actions);
    cli.run();
}

const program: Program = {
    name: "plash speed",
    version: 0.1,
}

main(program);