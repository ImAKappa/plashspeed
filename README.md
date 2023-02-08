# Plash Speed

A note-taking system that supports flash-card generation

> ⚠️ Windows-only at the moment.

## Motivation

Flash-cards are [awesome](https://ncase.me/remember/)

But flash cards are discrete chunks of information that usually miss context.

Fully-fleshed out written notes have that context, but manually converting them to flash cards is time-consuming and redundant.

So, why not write notes in a way that can easily be converted to flash cards?
That way you get the benefits of flash cards, plus the context of your fleshed-out notes.

## Writing Notes

Write notes in a plain-text file using [Djot markup](https://djot.net/).

> Currently, only Djot markup is supported. It's like Markdown, but a bit nicer to work with.

For sections of your notes that you want converted to flash cards, use the div syntax with the class name `card`. Then annotate the front and back content of the card with [Block-level attributes](https://htmlpreview.github.io/?https://github.com/jgm/djot/blob/master/doc/syntax.html#block-attributes)

For example:

```text
# Lecture 3: Mitochondria

Course: CELLBIO

Mitchondria are organelles present in the cells of animals and plants.

:::card

{.ft}
Mitrochondria are the power house of the ...

{.bk}
cell

:::

This text won't be included in the card, so we can add more context about mitochondria
```

> Feature in-progress


For cloze-deletions (fill-in-the-blanks), use the `[cloze]{.cz}` span

```
Medical terms tend to be derived from Latin or Greek words.

::: card

[-Emia]{.cz} means presence in blood

:::
```

> Feature in-progress

Just like with Anki, you can number an arbitrary number of cloze deletions

```
::: card

[Life]{.c1} ... uh .. finds a way

- [Jeff Goldblum]{.c2}

:::
```

> Feature in-progress

## Note Filesystem

`cd` to some directory, like `mycwd`, on your computer, then run `plash new [NOTE ROOT DIR]`. Your current working directory should still be `mycwd`.

bash
```
[NOTE ROOT DIR]
|_ notes-site # <-- these get automatically generated
  |_ assets/
    |_ styles.css
    |_ main.js
  |_ bio/
    |_ lec1.html
    |_ lec2.html
  |_ index.html
  
|_ src/ # <-- you edit files here
  |_ index.dj
  |_ bio/
    |_ lec1.dj
    |_ lec2.dj
```


Use whatever file structure makes sense to you within the `src` directory (as long as the file and directory names can be formed into a valid URL).
The website will be rendered with the same directory structure

## CLI Options

Run `plash --help` for the latest list of options.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for more details. This is mostly for developers.

## Roadmap

1. Consider adding support for plain-text Anki files

## History

<details><summary>Name?</summary>

"Flash" rhymes with "Plash". Flash cards are speedy memorization tool. Somehow this reminded me of one of my [favourite videos](https://youtu.be/cEN00wMFB2A)

</details>
