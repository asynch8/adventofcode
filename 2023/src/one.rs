const RADIX: u32 = 10;
fn u32_to_usize(x: u32) -> usize {
    x as usize
}
const NUMBER_MAP: [(&str, char); 10] = [
    ("zero", '0'),
    ("one", '1'),
    ("two", '2'),
    ("three", '3'),
    ("four", '4'),
    ("five", '5'),
    ("six", '6'),
    ("seven", '7'),
    ("eight", '8'),
    ("nine", '9'),

];
/* fn is_in_map(word: &str) -> bool {
    for (key, _) in NUMBER_MAP.iter() {
        if key == &word {
            return true;
        }
    }
    false
} */

fn find_position_of_string_in_string(string: &str, substring: &str) -> Option<usize> {
    let mut position: usize = 0;
    for (i, _) in string.chars().enumerate() {
        if string[i..].starts_with(substring) {
            return Some(position);
        }
        position += 1;
    }
    None
}

fn find_position_of_string_in_string_rev(string: &str, substring: &str) -> Option<usize> {
    let mut position: usize = string.len();
    for (_, _) in string.chars().rev().enumerate() {
        position -= 1;
        if string[position..].starts_with(substring) {
            return Some(position);
        }
    }
    None
}

fn main() {
    let file_path = "./data/input.1.txt";
    println!("In file {}", file_path);

    let input = fs::read_to_string(file_path).expect("Something went wrong reading the file");
    let lines: std::str::Lines<'_> = input.lines();
    let mut res = 0;
    for line in lines {
        println!("Current line: {}", line);
        let (mut first_char, mut last_char): ((Option<char>, Option<usize>), (Option<char>, Option<usize>)) = ((None, None), (None, None));
        for (index, char) in line.chars().enumerate() {
            if char.is_digit(RADIX)  {
                println!("Setting the first digit char to {:?}", (Some(char), Some(index)));
                first_char = (Some(char), Some(index));
                break;
            }
        }
        for tuple in NUMBER_MAP.iter() {
            let index = find_position_of_string_in_string(line, tuple.0);
            if !index.is_none() {
                if first_char.0.is_none() {
                    first_char = (Some(tuple.1), Some(index.unwrap()));
                    println!("First char is none, setting the first word digit to {}", tuple.1);
                    continue;
                }
                if index.unwrap() < first_char.1.unwrap() {
                    println!("Position of First char is {:?}, currIndexSaved {:?} Setting the first word digit to {}", first_char.1, index, tuple.1);
                    first_char = (Some(tuple.1), Some(index.unwrap()));
                    continue;
                }
            }   
        }

        for (index, char) in line.chars().rev().enumerate() {
            let fixed_index = &line.len() - index - 1;
            println!("Current char: {}, index: {}, ", char, fixed_index);
            if char.is_digit(RADIX) {
                println!("Setting the last digit char {:?}", (Some(char), fixed_index));
                last_char = (Some(char), Some(fixed_index));
                break;
            }
        }
        for tuple in NUMBER_MAP.iter() {
            let position_of_word_number = find_position_of_string_in_string_rev(line, tuple.0);
            
            println!("curr index {:?}, highest index, {:?}", position_of_word_number, last_char);
            if !position_of_word_number.is_none() {
                println!("found in the string {}", tuple.1);
                if last_char.0.is_none() {
                    last_char = (Some(tuple.1), Some(position_of_word_number.unwrap()));
                    println!("Setting the last char to {}", tuple.1);
                    continue;
                }
                if position_of_word_number.unwrap() > last_char.1.unwrap() {
                    last_char = (Some(tuple.1), Some(position_of_word_number.unwrap()));
                    println!("Setting the last char to {}", tuple.1);
                    continue;
                }
                println!("Index {} of value {} was not higher than {:?}", position_of_word_number.unwrap(), tuple.1, last_char);
            } else {
                println!("didnt find in the string {}", tuple.1);
            }
        }
        if first_char.0.is_none() || last_char.0.is_none() {
            println!("Skipping line because of None");
            return
        }
        println!("First char: {}, Last char: {}", first_char.0.unwrap(), last_char.0.unwrap());
        let joined_string = (first_char.0.unwrap().to_string()+&last_char.0.unwrap().to_string()).parse::<i32>().unwrap();
        res += joined_string;
        println!("{}", joined_string)
        
    }
    println!("Final result {}", res)
}
