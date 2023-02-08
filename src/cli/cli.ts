import { parse, Args } from "https://deno.land/std@0.175.0/flags/mod.ts";
import { Program } from "./program.ts";

export type Actions = Record<string, (options?: string[]) => void>;

export class Cli {

    program: Program;
    args: Args;

    constructor(program: Program) {
        this.program = program;
        this.args = this.parseArgs();
    }

    error(err: string): Error {
        throw new Error(`error: ${err}\n\n${this.usage()}`);
    }

    usage(): string {
        return `USAGE:\n\t${this.program.name}\t[COMMAND [OPTION]\nFor more information try --help`;
    }

    help(): string {
        return `${this.program.name} v${this.program.version}`;
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
    run(c: Actions) {
        const args = this.args["_"].map(el => el.toString());
        // Handle commands
        const command = args[0] ?? this._checkEmptyCommand();
        const fn = c[command] ?? this.error(`"${command}" not recognized as a valid command`);
        // Handle options
        const options = args.slice(1);
        if (options.length == 0) {
            fn();
        } else {
            fn(options);
        }
    }
}