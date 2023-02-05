# Plash Speed

A note-taking system that supports flash-card generation

## Motivation

Flash-cards are [awesome](https://ncase.me/remember/)

But flash cards are discrete chunks of information that usually miss context.

Fully-fleshed out written notes have that context, but manually converting them to flash cards is time-consuming and redundant.

So, why not write notes in a way that can easily be converted to flash cards?
That way you get the benefits of flash cards, plus the context of your fleshed-out notes.

## Workflow

Write notes in a plain-text file using [Djot markup](https://djot.net/).

> Only Djot is supported currently. It's like Markdown, but nicer

For sections of your notes that you want converted to flash cards, use the div syntax with the class name `card`. Then annotate the front and back content of the card with [Block-level attributes](https://htmlpreview.github.io/?https://github.com/jgm/djot/blob/master/doc/syntax.html#block-attributes)

For example:

```text
# Lecture 3: Mitochondria

BIO 1LT3: Biology for Noobs

Mitchondria are organelles present in the cells of animals and plants.

:::card

{.ft}
Mitrochondria are the power house of the ...

{.bk}
cell

:::

This text won't be included in the card, so we can add more context about mitochondria
```


For cloze-deletions (fill-in-the-blanks), use the `[cloze]{.cz}` span

```
Medical terms tend to be derived from Latin or Greek words.

::: card

[-Emia]{.cz} means presence in blood

:::
```

Just like with Anki, you can number an arbitrary number of cloze deletions

```
::: card

[Life]{.c1} ... uh .. finds a way

- [Jeff Goldblum]{.c2}

:::
```



Use whatever file structure makes sense to you (as long as the file and directory names can be formed into a valid URL).


`cd` to the root directory of your notes, then run `plash site` from your command line to generate the website files. 

Or run `plash --serve` to re-render your notes every time you update and then save a file. 

## CLI Options

`plash site`: renders the site from your notes 

`plash site --serve`: renders the site from your notes, enables hot reloading

`plash cards`: extracts the flash card portions of your notes into a plain-text file

> Considering adding support for plain-text Anki files

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for more details. This is mostly for developers.

## History

<details><summary>Name?</summary>

"Flash" rhymes with "Plash" and flash cards are my fastest study method, and somehow this reminded me of one of my [favourite videos of all time](https://youtu.be/cEN00wMFB2A)

</details>