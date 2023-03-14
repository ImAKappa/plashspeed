///! Initialization logic
use std::fs;

/// Reads welcome text for index.dj file
pub fn index_welcome_text() -> String {
    let file_path = "./src/notes/index.dj";
    let contents = fs::read_to_string(file_path).expect("Should have been able to read file");
    contents
}
