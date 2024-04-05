use std::{fs, collections::HashMap, hash};

const STATE_LOOKING_FOR_NEXT_LINE: usize = 0;
const STATE_COLLECTING_VALUES: usize = 1;

/*fn pretty_print_map(map: &HashMap<usize, usize>) {
    let mut keys = map.keys().collect::<Vec<&usize>>();
    keys.sort();
    for key in keys {
        let value = map.get(key).unwrap();
        println!("{}: {}", key, value);
    }
}*/

fn abs_diff(a: usize, b: usize) -> usize {
    if a > b {
        return a - b
    }
    b - a
}

fn traverse_maps(maps: &HashMap<&str, Vec<Vec<usize>>>, curr_from_map: &str, seed: usize) -> usize {
    let mut final_value = seed;
    for x in maps.keys() {
        let map_from_name = x[0..x.len()-4].split('-').collect::<Vec<&str>>();
        let from = map_from_name[0];
        let to = map_from_name[2];
        if from == curr_from_map {
            // println!("Map from: {:?}, to: {:?}, seed {:?}, curr_map {}", from, to, seed, x);
            let map = maps.get(x).unwrap();
            // println!("Map: {:?}", map);
            for line in map {
                // println!("Checking if {} >= {} <= {} and converting {} and {} in range {} to offset {}", line[1], seed, line[1]+line[2], line[0], line[1], line[2], abs_diff(line[0], line[1]));
                if seed >= line[1] && seed <= line[1]+line[2]{
                    if line[0] > line[1] {
                        final_value = seed + abs_diff(line[0], line[1]);
                    } else {
                        final_value = seed - abs_diff(line[0], line[1]);
                    }
                    
                    break;
                }
            }
            // println!("Seed: {}, value: {:?}", seed, final_value);
            final_value = traverse_maps(maps, to, final_value);
            break;
        }
    }
    final_value
}

fn parse_file(input: &str) -> (Vec<usize>, HashMap<&str, Vec<Vec<usize>>>) {
    let mut seeds: Vec<usize> = Vec::new();
    let mut maps: HashMap<&str, Vec<Vec<usize>>> = HashMap::new();
    let mut state = STATE_LOOKING_FOR_NEXT_LINE;
    let mut current_section: &str = "";
    
    let lines: Vec<&str> = input.lines().collect();
    for line in lines.clone() {
        // println!("Current line: {}", line);
        if state == STATE_LOOKING_FOR_NEXT_LINE {
            println!("Looking for next line");
            if line == "" {
                continue;
            }
            let line_split = line.split(':').collect::<Vec<&str>>();

            if line_split[0].trim() == "seeds" {
                seeds = line_split[1].trim().split(' ').map(|x| x.parse::<usize>().unwrap()).collect::<Vec<usize>>();
                //println!("Found seeds, {:?}", seeds);
                continue;
            } 
            current_section = line_split[0].trim();
            state = STATE_COLLECTING_VALUES;
        } else if state == STATE_COLLECTING_VALUES {
            if line == "" {
                state = STATE_LOOKING_FOR_NEXT_LINE;
                continue;
            }
            let line_split: Vec<usize> = line.split(' ').map(|x| x.parse::<usize>().unwrap()).collect::<Vec<usize>>();
            if !maps.contains_key(current_section) {
                maps.insert(current_section, vec![]);
            }
            maps.entry(current_section).and_modify(|x| x.push(line_split.clone()));
        }
    }
    return  (seeds.clone(), maps.clone())
}

pub fn solve_day5_part1(filename: &str) -> Option<usize> {
    let input = fs::read_to_string(filename).expect("Something went wrong reading the file");
    let (seeds, maps) = parse_file(&input);
    
    println!("Maps: {:?}", maps);

    let mut lowest_num: Option<usize> = None;
    for seed in seeds {
        let value = traverse_maps(&maps, "seed", seed);
        if lowest_num.is_none() || value < lowest_num.unwrap() {
            lowest_num = Some(value);
        }
    }
    println!("Lowest num: {:?}", lowest_num);
    lowest_num
}

fn has_number_in_range(start_number: usize, number_range: usize, ranges: Vec<Vec<usize>>) -> Vec<usize> {
    let mut vect = vec![];
    for range in ranges {
        println!("Range: {} - {}", start_number, start_number+number_range);
        println!("Range: {} - {}", range[1], range[1]+range[2]);
        if start_number < range[1]+range[2] && start_number+number_range > range[1] {
            println!("Found number in range, {}", start_number+number_range-range[1]);
            vect.push(start_number+number_range-range[1]);
        }
        // ) || (start_number <= range[1]+range[2] && (start_number+number_range)-(range[1]+range[2]) > start_number)
        /*if start_number >= range[1] || start_number+number_range <= range[1]+range[2] || (start_number < (range[1]+range[2]) && (start_number+number_range) > (range[1]+range[2])) {
            
            println!("{} - {} = {}",(range[1]+range[2]), (start_number+number_range), (start_number+number_range)-(range[1]+range[2]));
            return true;
        }*/        
    }
    vect
}

pub fn solve_day5_part2(filename: &str) -> Option<usize> {
    let input = fs::read_to_string(filename).expect("Something went wrong reading the file");
    println!("Generating maps");
    let (seeds, maps) = parse_file(&input);
    
    //println!("Maps: {:?}", maps);
    println!("Maps generated, finding lowest num");
    let mut lowest_num: Option<usize> = None;
    for (index, curr_value) in seeds.clone().into_iter().enumerate() {
        if index != 0 && (index+1) % 2 == 0 {
            let start_value = seeds[index-1];
            let range = curr_value;
            println!("Starting range: {}..{}", start_value, start_value+range);
            let seeds_to_soil_map = maps.get("seed-to-soil map").unwrap();
            println!("Seeds to soil map: {:?}", seeds_to_soil_map);
            let numbers_to_run = has_number_in_range(start_value, range, seeds_to_soil_map.clone());
            if numbers_to_run.len() > 0 {
                for number_to_run in numbers_to_run {
                    println!("Number to run: {:?} : {} - {}", number_to_run, start_value+range-number_to_run, start_value+range);
                    for seed in start_value+range-number_to_run..start_value+range {
                        let value = traverse_maps(&maps, "seed", seed);
                        if lowest_num.is_none() || value < lowest_num.unwrap() {
                            lowest_num = Some(value);
                        }
                    }
                }
                
            } else {
                println!("Did not find number in range");
            }
            
            
        }
        
    }
    println!("Lowest num: {:?}", lowest_num);
    lowest_num
}