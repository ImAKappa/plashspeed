/// The core functionality of the application
import { createNotesTemplate } from "./notes/notes.ts";
import { Errorer } from "./utils/errors.ts";
import { parse, Args } from "https://deno.land/std@0.175.0/flags/mod.ts";

/** Class for modelling app actions */
export class AppAction {

    private err: Errorer;

    constructor() {
        this.err = new Errorer();
    }

    new(args: Args): void {
        console.log("`new`");
        // if (args === undefined) {
        //     this.err.error("Missing options");
        //     // `return` is unreachable due to thrown error, but TS linter can't tell
        //     return;
        // }
        // const dir = options[0] ?? this.err.error("`new` requires `dir` option. Missing path of a directory");
        // const emptyTemplate = options[1] === "--empty";
        // createNotesTemplate(dir, emptyTemplate);
        return;
    }

    build() {
        console.log("`build`");
    }

    serve(args: Args) {
        console.log("`serve`");
    }

    speed() {
        console.log("plash speed ㅋㅋㅋㅋㅋㅋ https://youtu.be/cEN00wMFB2A");
    }
}

// export function actionNew(options?: string[]): void {
//     if (options === undefined || options.length == 0) {
//         throw new Error("missing root `dir` for notes");
//     } else if (options.length > 1) {
//         throw new Error("too many options for root `dir`, only 1 is required");
//     }
//     const dir = options[0];
//     return;
// }

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