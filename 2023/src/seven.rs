use std::{fs, collections::HashMap};

fn get_first_char_not_same_in_both_strings(a: &str, b: &str) -> Option<usize> {
    let mut index = 0;
    for (a_char, b_char) in a.chars().zip(b.chars()) {
        if a_char != b_char {
            return Some(index);
        }
        index += 1;
    }
    None
}

pub fn solve_day7_part1(filename: &str) -> usize {
    println!("Day 7 part 1");
    let mut total_winnings = 0;
    let card_types = vec!['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J','Q','K','A'];
    let input = fs::read_to_string(filename).expect("Something went wrong reading the file");
    let lines = input.lines().collect::<Vec<&str>>();
    let mut card_rankings: Vec<(Vec<&str>, HashMap<&str, usize>, usize)> = vec![];
    for line in lines {
        let mut card_count: HashMap<&str, usize> = HashMap::new();
        let hand = line.split(' ').collect::<Vec<&str>>();
        let cards = hand[0].split("").filter(|&x| x != "").collect::<Vec<&str>>();
        let bid = hand[1].parse::<usize>().unwrap();

        println!("Cards: {:?}, bid: {}", cards, bid);
        for card in cards.clone() {
            *card_count.entry(card).or_insert(0) += 1;
        }
        card_rankings.push((cards, card_count, bid));
    }
    // card_rankings.clone().into_iter().for_each(|x| println!("card_count: {:?}", x.1.keys().count()));
    card_rankings.sort_by(|a, b| {
        let key_count_a = a.1.keys().count();
        let key_count_b = b.1.keys().count();
        if key_count_b != key_count_b {
            return key_count_b.cmp(&key_count_a)
        } else {
            let mut sorted_values_a = a.1.values().into_iter().collect::<Vec<&usize>>();
            sorted_values_a.sort();
            let mut sorted_values_b = b.1.values().into_iter().collect::<Vec<&usize>>();
            sorted_values_b.sort();
            if sorted_values_a[sorted_values_a.len()-1] != sorted_values_b[sorted_values_b.len()-1] {
                return sorted_values_a[sorted_values_a.len()-1].cmp(sorted_values_b[sorted_values_b.len()-1])
            } else if sorted_values_a.len() > 1 && sorted_values_b.len() > 1 && sorted_values_a[sorted_values_a.len()-2] != sorted_values_b[sorted_values_b.len()-2] {
                return sorted_values_a[sorted_values_a.len()-2].cmp(sorted_values_b[sorted_values_b.len()-2])
            } else {
                let first_char_not_same = get_first_char_not_same_in_both_strings(&a.0.clone().join(""), &b.0.clone().join(""));
                if !first_char_not_same.is_none() {
                    let card_type_a = card_types.iter().position(|&x| x == a.0[first_char_not_same.unwrap()].chars().nth(0).unwrap()).unwrap();
                    let card_type_b = card_types.iter().position(|&x| x == b.0[first_char_not_same.unwrap()].chars().nth(0).unwrap()).unwrap();
                    return card_type_a.cmp(&card_type_b)
                }
                return a.0.join("").cmp(&b.0.join(""))
            
            }
        }
    });
    for (index, card_ranking) in card_rankings.clone().into_iter().enumerate() {
        total_winnings += (index+1) * card_ranking.2;
        println!("Adding {:?} to total winnings", (index+1) * card_ranking.2);
    }
    println!("Total winnings: {:?}", total_winnings );
    total_winnings
}

pub fn solve_day7_part2(filename: &str) -> usize {
    println!("Day 7 part 1");
    let mut total_winnings = 0;
    let card_types = vec!['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J','Q','K','A'];
    let input = fs::read_to_string(filename).expect("Something went wrong reading the file");
    let lines = input.lines().collect::<Vec<&str>>();
    let mut card_rankings: Vec<(Vec<&str>, HashMap<&str, usize>, usize)> = vec![];
    for line in lines {
        let mut card_count: HashMap<&str, usize> = HashMap::new();
        let hand = line.split(' ').collect::<Vec<&str>>();
        let cards = hand[0].split("").filter(|&x| x != "").collect::<Vec<&str>>();
        let bid = hand[1].parse::<usize>().unwrap();

        println!("Cards: {:?}, bid: {}", cards, bid);
        for card in cards.clone() {
            *card_count.entry(card).or_insert(0) += 1;
        }
        card_rankings.push((cards, card_count, bid));
    }
    // card_rankings.clone().into_iter().for_each(|x| println!("card_count: {:?}", x.1.keys().count()));
    card_rankings.sort_by(|a, b| {
        let key_count_a = a.1.keys().count();
        let key_count_b = b.1.keys().count();
        if (key_count_b != key_count_b && !a.1.contains_key("J") && !b.1.contains_key("J")) || (key_count_a == 1 || key_count_b == 1) {
            return key_count_b.cmp(&key_count_a)
        } else {
            println!("a: {:?}", a.1);
            println!("b: {:?}", b.1);
            let mut sorted_values_a = a.1.keys().clone().filter(|x| !x.contains("J")).map(|x| a.1.get(x).unwrap()).into_iter().collect::<Vec<&usize>>();
            sorted_values_a.sort();
            let mut sorted_values_b = b.1.keys().clone().filter(|x| !x.contains("J")).map(|x| b.1.get(x).unwrap() ).into_iter().collect::<Vec<&usize>>();
            sorted_values_b.sort();
            println!("sorted_values_a: {:?}", sorted_values_a);
            println!("sorted_values_b: {:?}", sorted_values_b);
            println!("a: {:?}", a.1);
            let mut cmp_a = sorted_values_a[sorted_values_a.len()-1].clone();
            let mut cmp_b = sorted_values_b[sorted_values_b.len()-1].clone();
            if a.1.contains_key("J") {
                cmp_a += a.1.get("J").unwrap();
            }
            if b.1.contains_key("J") {
                cmp_b += b.1.get("J").unwrap();
            }
            if cmp_a != cmp_b {
                return cmp_a.cmp(&cmp_b);
            } else if sorted_values_a.len() > 1 && sorted_values_b.len() > 1 && sorted_values_a[sorted_values_a.len()-2] != sorted_values_b[sorted_values_b.len()-2] {
                return sorted_values_a[sorted_values_a.len()-2].cmp(sorted_values_b[sorted_values_b.len()-2])
            } else {
                let first_char_not_same = get_first_char_not_same_in_both_strings(&a.0.clone().join(""), &b.0.clone().join(""));
                if !first_char_not_same.is_none() {
                    let card_type_a = card_types.iter().position(|&x| x == a.0[first_char_not_same.unwrap()].chars().nth(0).unwrap()).unwrap();
                    let card_type_b = card_types.iter().position(|&x| x == b.0[first_char_not_same.unwrap()].chars().nth(0).unwrap()).unwrap();
                    return card_type_a.cmp(&card_type_b)
                }
                return a.0.join("").cmp(&b.0.join(""))
            
            }
        }
    });
    println!("Card rankings: {:?}", card_rankings);
    for (index, card_ranking) in card_rankings.clone().into_iter().enumerate() {
        total_winnings += (index+1) * card_ranking.2;
        println!("Adding {:?} to total winnings", (index+1) * card_ranking.2);
    }
    println!("Total winnings: {:?}", total_winnings );
    total_winnings
}