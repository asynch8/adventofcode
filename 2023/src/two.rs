use std::fs;
fn main() {
    let file_path = "./data/input.2.txt";
    println!("In file {}", file_path);

    let contents = fs::read_to_string(file_path).expect("Something went wrong reading the file");
    
    let lines: std::str::Lines<'_> = contents.lines();
    let mut game_ids = vec![0; 0];
    let mut final_num = 0;
    let mut powers = 0;
    let max_red = 12;
    let max_green = 13;
    let max_blue = 14;
    'lineloop: for line in lines {
        println!("Line: {}", line);
        let split_line = line.split(':').collect::<Vec<&str>>();
        let game_id = split_line[0].split(' ').collect::<Vec<&str>>()[1];
        let sets = split_line[1].split(';').collect::<Vec<&str>>();
        let mut min_red = 0;
        let mut min_green = 0;
        let mut min_blue = 0;
        for set in sets {
            println!("Set: {}", set);
            let cubes = set.split(',').collect::<Vec<&str>>();
            for cube in cubes {
                println!("Cube: {}", cube);
                let cube_split = cube.trim().split(' ').collect::<Vec<&str>>();
                println!("Cube split: {:?}", cube_split[0]);
                match cube_split[1] {
                    "red" => {
                        let red = cube_split[0].parse::<i32>().unwrap();
                        /*if red > max_red {
                            println!("Red over limit for gameid: {}", game_id);
                            continue 'lineloop;
                        }*/
                        if red > min_red {
                            min_red = red;
                        }
                    }
                    "green" => {
                        let green = cube_split[0].parse::<i32>().unwrap();
                        /*if green > max_green {
                            println!("Green over limit for game_id: {}", game_id);
                            continue 'lineloop;
                        }*/
                        if green > min_green {
                            min_green = green;
                        }
                    }
                    "blue" => {
                        let blue = cube_split[0].parse::<i32>().unwrap();
                        /*if blue > max_blue {
                            println!("Blue over limit for game_id: {}", game_id);
                            continue 'lineloop;
                        }*/
                        if blue > min_blue {
                            min_blue = blue;
                        }
                    }
                    _ => println!("Unknown color {}", cube_split[1]),
                }
                
            }
        }
        println!("Min red: {}, min green: {}, min blue: {}", min_red, min_green, min_blue);
        println!("multiplied: {}", min_red * min_green * min_blue);
        powers += min_red * min_green * min_blue;
        println!("Adding GameId: {}", game_id.to_string().parse::<i32>().unwrap());
        game_ids.push(game_id.to_string().parse::<i32>().unwrap());
        final_num += game_id.to_string().parse::<i32>().unwrap();
        
    }
    println!("GameIds: {:?}, final_num: {:?},  powers: {}", game_ids, final_num, powers);
}
