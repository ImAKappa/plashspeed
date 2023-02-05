## ARCHITECTURE

**Cli**: The command-line tool, `plash`, is compiled using `Deno`.

**Renderer**: Converts markup to a simple website with these functions:

- Navigation pane
- `Review all cards` from the home page
- `Review cards` on the page of a particular note

**Local Database Manager**: Keeps track of:

- Spacing and repetition of cards
- Last review date