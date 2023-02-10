## ARCHITECTURE

`plash speed` is compiled, using `Deno`, from the `src/index.ts` file.

Once you clone the repository, test the project with:

```bash
deno run --allow-read=. --allow-write=. ./src/index.ts [COMMAND] [OPTION]
```

After fiddling about with it, try compiling program:

```bash
deno compile --allow-read --allow-net --output .\build\target\plashspeed .\src\index.ts
```

I dogfood `plash speed` by using it to write the documentation (see `docs`).

## CLI

The CLI is the command-line interface

## DB

Keeps track of:

- Spacing and repetition of cards
- Last review date

## Djot

Shamelessly ripped these files from [jgm/djot.js](https://github.com/jgm/djot.js).

Originally, I wanted to use Djot as an npm library with Deno.
However, as of Feb 2023, the `deno compile` option does not support npm modules.

After ripping files from the djot.js implementation, I reformatted imports to work with Deno, 
removed the npm/node-related commands (like `process` and `fs`), and removed files I didn't need (like `cli.ts` and `pandoc.ts`)

## Notes

Generates the note source scaffolding. These include:

- `src` directory
- `index.dj`
- tutorial files on how to use the flashcard integration

## Server

Manages the hot-reload server stuff so users can edit and see live updates in the browser

> This feature currently does not exist because I have no idea how I'm going to do this.
> However, I could prolly use the [Deno filesystem watcher](https://deno.land/manual@v1.26.2/examples/file_system_events).

## Site 

Converts markup (`.dj`) to a simple website (`.html`) with these features:

- Navigation pane
- `Review all cards` from the home page
- `Review cards` on the page of a particular note
- default `styles.css`

## Utils

Little helper functions that aren't really specific to `plashspeed`