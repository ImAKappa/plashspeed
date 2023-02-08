import { getErrorMessage } from "./utils/errors.ts";
import { Program } from "./cli/program.ts";
import { Cli, Actions } from "./cli/cli.ts";

function main(program: Program) {
    const cli = new Cli(program);
    const actions: Actions = {
        "new": (dir) => console.log(`[action] new: ${dir}`),
        "build": () => console.log("[action] build"),
    }
    try {
        cli.run(actions);
    } catch (err) {
        console.log(getErrorMessage(err));
    }
}

const program: Program = {
    name: "plash",
    version: 0.1,
}

main(program);