use std::fs;
use regex::Regex;
const RADIX: u32 = 10;

fn check_if_adjacent_indexes_are_symbols(lines: Vec<&str>, index_x: usize, index_y: usize) -> bool {
    let re = Regex::new(r"[^\d\.]").unwrap();
    let mut adjacent_indexes: Vec<(usize, usize)> = vec![(0, 0); 0];
    if index_x > 0 {
        adjacent_indexes.push((index_x - 1,  index_y));
    }
    if index_x < lines[index_y].len() - 1 {
        adjacent_indexes.push((index_x + 1, index_y));
    }
    if index_y > 0 {
        adjacent_indexes.push((index_x, index_y - 1));
    }
    if index_y < lines.len() - 1 {
        adjacent_indexes.push((index_x, index_y + 1));
    }
    if index_x > 0 && index_y > 0 {
        adjacent_indexes.push((index_x - 1, index_y - 1));
    }
    if index_x < lines[index_y].len() - 1 && index_y > 0 {
        adjacent_indexes.push((index_x + 1, index_y - 1));
    }
    if index_x > 0 && index_y < lines.len() - 1 {
        adjacent_indexes.push((index_x - 1, index_y + 1));
    }
    if index_x < lines[index_y].len() - 1 && index_y < lines.len() - 1 {
        adjacent_indexes.push((index_x + 1, index_y + 1));
    }
    
    for adjacent_index in adjacent_indexes {
        println!("Adjacent index: {:?}, symbol: {:?}", adjacent_index, lines[adjacent_index.1].chars().nth(adjacent_index.0).unwrap());
        if re.is_match(&lines[adjacent_index.1].chars().nth(adjacent_index.0).unwrap().to_string()) {
            println!("Adjacent index is symbol");
            return true;
        }
    }
    
    false
}


fn main() {
    let file_path = "./data/input.3.txt";
    println!("In file {}", file_path);

    let input = fs::read_to_string(file_path).expect("Something went wrong reading the file");
    let lines: Vec<&str> = input.lines().collect();
    let mut valid_parts: Vec<i32> = vec![];
    //println!("Lines: {:?}", lines[0]);
    for (line_index, line) in lines.iter().enumerate() {
        let mut part = false;
        let mut has_adjacent = false;
        println!("Index: {} Current line: {}", line_index, line);
        let mut numbers: Vec<char> = vec![];
        for (char_index, char) in line.chars().enumerate() {
            println!("Index: {}x{} Current char: {}", line_index, char_index, char);
            if char.is_digit(RADIX) {
                part = true;
                numbers.push(char);
                if !check_if_adjacent_indexes_are_symbols(lines.clone(), char_index, line_index) {
                    println!("Adjacent indexes are symbols, skipping");
                    continue;
                }
                println!("Part is valid");
                has_adjacent = true;
                
            } else if part {
                let number: String = numbers.clone().into_iter().collect();
                println!("Part has ended, {}", number);
                if has_adjacent {
                    println!("Part has adjacent, {}", number);
                    valid_parts.push(number.parse::<i32>().unwrap());
                }
                has_adjacent = false;
                part = false;
                numbers = vec![];
            }
        }
        
    }
    println!("Valid parts: {:?}, {}", valid_parts, valid_parts.iter().sum::<i32>());
    
}