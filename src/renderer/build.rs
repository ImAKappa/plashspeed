use std::fs::{File, create_dir_all, self};
use std::path::Path;
use std::io::{Write, Error};
use jotdown::Parser;
use toml::map::Map;
use walkdir::WalkDir;
use toml::Table;

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