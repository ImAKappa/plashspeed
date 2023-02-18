use clap::{Parser, Subcommand};
use plashspeed::notes;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
#[command(propagate_version = true)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    New { dir: String },
    Build { out: String },
    Speed,
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::New { dir } => {
            match notes::new(dir.to_string()) {
                Ok(_) => println!("Created notes!"),
                Err(error) => println!("Unable to create notes! {:?}", error),
            };
        },
        Commands::Build { out } => {
            notes::build(out.to_string());
        },
        Commands::Speed => {
            println!("https://youtu.be/cEN00wMFB2A");
        },
    }
}
