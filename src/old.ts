// Stdlib
import { walk } from "https://deno.land/std@0.176.0/fs/mod.ts";
import { ensureFile } from "https://deno.land/std@0.176.0/fs/mod.ts";

import { renderHTML, parse } from "./djot/index.ts";
import { parseArgs } from "./cli.ts";

async function main() {
    const args = parseArgs();
    console.log(args);

    let paths: string[] = [];
    const indexPath = `${args.builddir}\\index.html`;

    for await (const path of walk(args.rootdir)) {
        console.log(path);
        if (!path.isFile || !path.path.endsWith(".dj")) { continue; }
        
        const text = await Deno.readTextFile(path.path);
        let html = renderHTML(parse(text));
        html += `<a href="${indexPath.replaceAll("\\", "/")}">Back</a>`; // TODO: Fix backlinks
        console.log(html);

        paths.push(path.path.replace(".dj", ".html"));
        const outPath = `.\\${args.builddir}\\${path.path.replace(".dj", ".html")}`;
        await ensureFile(outPath);
        await Deno.writeTextFile(outPath, html);
    }

    const nav = paths.map(p => {
        return `<li><a href="${p.replaceAll("\\", "/")}">${p.replaceAll("\\", "/")}</a></li>`;
    }).join("\n");
    console.log(nav);
    const indexHTML = "<html><head><title>Hi</title></head><body><ul>" + nav + "</ul></body>";
    await ensureFile(".\\" + indexPath);
    await Deno.writeTextFile(".\\" + indexPath, indexHTML);
}

main();

// console.log(renderHTML(parse("- _hi_ $`\epsilon`",{sourcePositions:true})));