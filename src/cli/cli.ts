import { Errorer } from "../utils/errors.ts";
import { parse, Args } from "https://deno.land/std@0.175.0/flags/mod.ts";
import { Program } from "./program.ts";

interface Action {fn: (args: Args) => void, help?: string}
export type Actions = Record<string, Action>;

/** Command Line Interface */
export class Cli {

    readonly program: Program;
    readonly args: Args;
    readonly actions: Actions;
    private err: Errorer;

    constructor(program: Program, actions: Actions) {
        this.program = program;
        this.args = this.parseArgs();
        this.actions = actions;
        this.err = new Errorer();
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
        const args = parse(Deno.args, {boolean: ["help"]});
        return args;
    }

    private _checkEmptyCommand(): void {
        if (this.args.help) {
            console.log(this.help());
            Deno.exit();
        }
        this.err.error("missing command");
        return;
    }

    /** Runs a set of possible actions based on cli args */
    handleActions(c: Actions): void {
        const args = this.args["_"].map(el => el.toString());
        // Handle commands
        const command = args[0] ?? this._checkEmptyCommand();
        const action = c[command] ?? this.err.error(`"${command}" not recognized as a valid command`);
        action.fn(this.args);
        return;
    }

    run(): void {
        try {
            this.handleActions(this.actions);
        } catch (err) {
            console.log(`error: ${this.err.getErrorMessage(err)}\n\n${this.usage()}\n`);
        }
        return;
    }
}