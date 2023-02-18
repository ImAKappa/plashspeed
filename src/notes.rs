use std::fs::{File, create_dir_all};
use std::path::Path;
use std::io::{Write, Error};
use log::{info};
use jotdown::Parser;

pub fn new(dir: String) -> Result<(), Error> {
    info!("scaffold new notes at {}", dir);
    let dir = Path::new(&dir);
    create_dir_all(&dir)?;
    let path = Path::new(&dir).join("index.dj");
    let mut output = File::create(path)?;
    write!(output, "New notes!")?;
    Ok(())
}

pub fn build(out_path: String) {
    let djot_input = "::: card\nhello!\n:::";
    let events = Parser::new(djot_input);
    let mut html = String::new();
    jotdown::html::push(events, &mut html);
    println!("build notes, output site to {}\n\n{}", out_path, html);
}