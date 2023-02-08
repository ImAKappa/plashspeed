import { getErrorMessage } from "../utils/errors.ts";
import { parse, Args } from "https://deno.land/std@0.175.0/flags/mod.ts";
import { Program } from "./program.ts";

export type Actions = Record<string, {fn: (options?: string[]) => void, help?: string }>;

export class Cli {

    program: Program;
    args: Args;
    actions: Actions;

    constructor(program: Program, actions: Actions) {
        this.program = program;
        this.args = this.parseArgs();
        this.actions = actions;
    }

    error(err: string): Error {
        throw new Error(err);
    }

    usage(): string {
        return `USAGE:\n\t${this.program.name} [COMMAND [OPTION]\n\nFor more information try --help`;
    }

    help(): string {
        let helpOutput = `${this.program.name} v${this.program.version}\nA note-taking system\n\n`;
        // Options
        helpOutput += `OPTIONS:\n\t-h, --help\t\tPrint help information\n\n`
        // Commands
        const availableCommands = Object.keys(this.actions).map(c => `${c}\t\t${this.actions[c].help ?? ""}`);
        helpOutput += `Available commands\n  ${availableCommands.join("\n  ")}`
        return helpOutput;
    }

    parseArgs(): Args {
        const args = parse(Deno.args, {
            boolean: ["help"]
        });
        return args;
    }

    _checkEmptyCommand(): void {
        if (this.args.help) {
            console.log(this.help());
            Deno.exit();
        }
        this.error("missing command");
    }

    /** Runs a set of possible actions based on cli args */
    handleActions(c: Actions) {
        const args = this.args["_"].map(el => el.toString());
        // Handle commands
        const command = args[0] ?? this._checkEmptyCommand();
        const action = c[command] ?? this.error(`"${command}" not recognized as a valid command`);
        // Handle options
        const options = args.slice(1);
        if (options.length == 0) {
            action.fn();
        } else {
            action.fn(options);
        }
    }

    run() {
        try {
            this.handleActions(this.actions);
        } catch (err) {
            console.log(`error: ${getErrorMessage(err)}\n\n${this.usage()}\n`);
        }
    }
}