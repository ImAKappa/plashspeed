/// Entry point to the executable
import { Program } from "./cli/program.ts";
import { Args } from "https://deno.land/std@0.175.0/flags/mod.ts";
import { Cli, SubCommands } from "./cli/cli.ts";
import { New, Build, Serve, Speed } from "./app.ts";

function main() {
    const program: Program = { name: "plash speed", version: 0.1 };
    const commands: SubCommands = {
        "new": (args?: Args) => new New(args),
        "build": (args?: Args) => new Build(args),
        "serve": (args?: Args) => new Serve(args),
        "speed": (args?: Args) => new Speed(args),
    }
    const cli = new Cli(program, commands);
    cli.run();

    let c = New;
}

main();