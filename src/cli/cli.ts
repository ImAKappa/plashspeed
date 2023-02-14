import { Errorer } from "../utils/errors.ts";
import { parse, Args } from "https://deno.land/std@0.175.0/flags/mod.ts";
import { Program } from "./program.ts";
import { SubCommand} from "../app.ts";

export type SubCommands = Record<string, (args?: Args) => SubCommand>;

/** Command Line Interface */
export class Cli {

    readonly program: Program;
    readonly args: Args;
    readonly commands: SubCommands;
    private err: Errorer;

    constructor(program: Program, actions: SubCommands) {
        this.program = program;
        this.args = this.parseArgs();
        this.commands = actions;
        this.err = new Errorer();
        console.log(this.args);
    }

    usage(): string {
        return `USAGE:\n\t${this.program.name} [COMMAND [OPTION]\n\nFor more information try --help`;
    }

    help(): string {
        let helpOutput = `${this.program.name} v${this.program.version}\nA note-taking system\n\n`;
        // Options
        helpOutput += `OPTIONS:\n\t--help\t\tPrint help information\n\n`;
        // Commands
        const availableCommands = Object.keys(this.commands).map(c => `${c}\t\t${this.commands[c]().description ?? ""}`);
        helpOutput += `Available commands\n  ${availableCommands.join("\n  ")}`;
        return helpOutput;
    }

    parseArgs(): Args {
        const args = parse(Deno.args, {boolean: ["help"]});
        return args;
    }

    private noSubcommand(): void {
        if (this.args.help) {
            console.log(this.help());
            Deno.exit();
        }
        this.err.error("missing subcommand");
        return;
    }

    /** Runs a set of possible actions based on cli args */
    handleCommands(c: SubCommands): void {
        const subcommands = this.args["_"].map(el => el.toString());
        const commanName = subcommands[0] ?? this.noSubcommand();
        const subcommand = c[commanName] ?? this.err.error(`"${commanName}" not recognized as a valid command`);
        subcommand(this.args);
        return;
    }

    run(): void {
        try {
            this.handleCommands(this.commands);
        } catch (err) {
            console.log(`error: ${this.err.getErrorMessage(err)}\n\n${this.usage()}\n`);
        }
        return;
    }
}