//! Configuration for PlashSpeed
//!
//! Main entry point for configuration is the `Config` struct
//!  
//! Configuration gets serialized as TOML format in `plash.toml` file
//!  when running `plash new [DIR]`,
//!  and gets deserialized from `plash.toml` when running `plash build`

use std::path::PathBuf;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Config {
    pub notes: NotesConfig,
    pub build: BuildConfig,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            notes: NotesConfig::default(),
            build: BuildConfig::default(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NotesConfig {
    pub title: Option<String>,
    pub authors: Vec<String>,
    pub description: Option<String>,
}

impl Default for NotesConfig {
    fn default() -> Self {
        Self {
            title: None,
            authors: vec!["".to_string()],
            description: None,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(default, rename_all = "kebab-case")]
pub struct BuildConfig {
    /// Where to put the built website
    pub build_dir: PathBuf,
}

impl Default for BuildConfig {
    fn default() -> Self {
        Self {
            /// The website output directory is called "notes"
            build_dir: PathBuf::from("notes"),
        }
    }
}
