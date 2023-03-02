use std::fs::{File, create_dir_all, self};
use std::path::Path;
use std::io::{Write, Error};
use jotdown::Parser;
use toml::map::Map;
use walkdir::WalkDir;
use toml::Table;

fn index_template() -> String {
    let s = "# Welcome!

PlashSpeed is a note-taking system that makes it easy to integrate flashcards into your notes.

Flash cards are written like this:

```
:::card
{.ft}
This is the front of a card

{.bk}
This is the back of a card
:::
```

And rendered into this:

:::card
{.ft}
This is the front of a card

{.bk}
This is the back of a card
:::

See [plashspeed](https://github.com/ImAKappa/plashspeed) for examples and documentation.

Plashspeed is built on top of Djot, a novel (and therefore experimental) markup language similar to MarkDown.
See [Djot markup](https://djot.net/) for more details.
";
    String::from(s)
}

#[derive(Debug)]
struct Config {
    name: String,
}

fn serialize(c: Config) -> String {
    format!("name=\"{}\"", c.name)
}

pub fn new(dirname: String) -> Result<(), Error> {
    // Project Directory
    let dir = Path::new(&dirname);
    create_dir_all(&dir)?;

    // Config
    let config = Config { name: String::from(&dirname) };
    let path = dir.join("plash.toml");
    let mut output = File::create(path)?;
    write!(output, "{}", serialize(config))?;

    //Notes Directory
    let notes_dir = dir.join("notes");
    create_dir_all(&notes_dir)?;

    // Example file
    let path = notes_dir.join("index.dj");
    let mut output = File::create(path)?;
    write!(output, "{}", index_template())?;

    Ok(())
}

/// Assume the user has cd into top-level note directory
pub fn build(config_path: String) -> Result<(), Error> {
    let config_path = Path::new(&config_path);
    // Get name
    let config = fs::read_to_string(config_path)?;
    let config = config.parse::<Table>().unwrap();

    let name = config["name"].as_str().unwrap();
    println!("Found name: '{}'", name);

    // Walk "notes" directory, using jotdown to convert .dj to .html
    // Output site should match the structure of input notes
    let djot_input = "::: card\nhello!\n:::";
    let events = Parser::new(djot_input);
    let mut html = String::new();
    jotdown::html::push(events, &mut html);
    println!("build notes, output HTML: \n\n{}", html);

    Ok(())
}