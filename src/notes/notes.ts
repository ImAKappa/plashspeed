/// Functions related to Source notes
import { ensureFile } from "https://deno.land/std@0.176.0/fs/ensure_file.ts";
import { join } from "https://deno.land/std@0.177.0/path/mod.ts";
import { File } from "../utils/pathing.ts";

function indexdj(): File {
    const content = `# Homepage\n\nWelcome to the homepage!\nSee [Djot markup](https://djot.net/) for more details.`;
    return {path: join("src", "index.dj"), content};
}

function example(): File {
    const content = `# Lecture 3: Mitochondria

BIO 1LT3: Biology for Noobs

Mitchondria are organelles present in the cells of animals and plants.

:::card

{.ft}
Mitrochondria are the power house of the ...

{.bk}
cell

:::

This text won't be included in the card, so we can add more context about mitochondria`;

    return {path: join("src", "bio", "mito.dj"), content};
}

function example2(): File {
    const content = `Medical terms tend to be derived from Latin or Greek words.

::: card

[-Emia]{.cz} means presence in blood

:::`;

    return {path: join("src", "bio", "emia.dj"), content}; 
}

/**
 * 
 * @param dir root directory of notes
 * 
 * File system
 * 
 * dir/
 * |_ notes-site/
 *   |_ assets/
 *     |_ styles.css
 *     |_ main.js
 *   |_ bio/
 *     |_ emia.html
 *   |_ index.html
 * |_ src/
 *   |_ index.dj
 *   |_ bio/
 *     |_ emia.dj
 */
export function createNotesTemplate(dir: string): void {
    const files: File[] = [
        indexdj(), // Homepage
        example(), // Example note
        example2(),
    ].map(fp => { 
        return {path: join(dir, fp.path), content: fp.content};
    });
    console.debug(files);
    files.forEach(async (fp) => {
        // ensureFile will NOT overwrite existing files
        await ensureFile(fp.path);
        await Deno.writeTextFile(fp.path, fp.content);
    });
    return;
}