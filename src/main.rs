use clap::{Parser, Subcommand};
use plashspeed::{config, notes, renderer};

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
    Build { config: String },
    Speed,
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::New { dir } => {
            let mut config = config::Config::default();

            match notes::new(dir.to_string(), &mut config) {
                Ok(_) => println!("Created notes!"),
                Err(error) => eprintln!("Unable to create notes! {:?}", error),
            };
        }
        Commands::Build { config } => {
            match renderer::build::build(config.to_string()) {
                Ok(_) => println!("Built site!"),
                Err(error) => eprintln!("Unable to build site! {:?}", error),
            };
        }
        Commands::Speed => {
            println!("https://youtu.be/cEN00wMFB2A");
        }
    }
}
