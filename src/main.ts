// @ts-ignore: Deno's npm API is stable but undergoing bug fixes
import { renderHTML, parse } from "./djot/index.ts";

console.log(renderHTML(parse("- _hi_",{sourcePositions:true})));