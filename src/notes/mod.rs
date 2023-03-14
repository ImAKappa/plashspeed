use std::fs::{File, create_dir_all, self};
use std::path::Path;
use std::io::{Write, Error};
use serde::{Serialize, Deserialize};
use jotdown::Parser;
use toml::map::Map;
use walkdir::WalkDir;
use toml::Table;

use crate::config::Config;

pub mod init;

pub fn new(dirname: String, config: &mut Config) -> Result<(), Error> {
    // Project Directory
    let dir = Path::new(&dirname);
    create_dir_all(&dir)?;

    // Config
    let path = dir.join("plash.toml");
    let mut output = File::create(path)?;
    config.notes.title = Some(dirname.clone());
    config.notes.description = Some("My notes".to_string());
    write!(output, "{}", toml::to_string(&config).unwrap())?;

    // Src Directory
    let notes_dir = dir.join("src");
    create_dir_all(&notes_dir)?;

    // Example file
    let path = notes_dir.join("index.dj");
    let mut output = File::create(path)?;
    write!(output, "{}", init::index_welcome_text())?;

    Ok(())
}