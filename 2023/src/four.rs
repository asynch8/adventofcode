use std::fs;
use std::collections::HashMap;

fn solve(file_path: &str) -> i32 {
    let mut score = 0;
    println!("In file {}", file_path);

    let input = fs::read_to_string(file_path).expect("Something went wrong reading the file");
    let lines: Vec<&str> = input.lines().collect();
    for line in lines {
        let mut card_score = 0;
        let linesplit = line.split(':').collect::<Vec<&str>>();

        let numberssplit = linesplit[1].split('|').collect::<Vec<&str>>();
        let winning_numbers = numberssplit[0].trim().split(' ').collect::<Vec<&str>>();
        let numbers = numberssplit[1].trim().split(' ').collect::<Vec<&str>>();

        for number in numbers {
            if number == "" {
                continue;
            }
            if winning_numbers.contains(&number) {
                if card_score == 0 {
                    card_score = 1;
                } else {
                    card_score *= 2;
                }
            }
        }

        score += card_score;
    }

    score
}

// Part two attempt one
// Learned that recursion is not the way to go, or at least not the way i did it
// copilot just autocompleted that comment above almost with what i was about to say lol, nice
/*
fn caclculate_score_for_card(card_number: usize, cards: Vec<&str>, mut scores: HashMap<usize, i32>) -> (i32, HashMap<usize, i32>) {
    let mut card_score = 0;
    let linesplit = cards[card_number-1].split(':').collect::<Vec<&str>>();
    println!("Line: {:?}", linesplit[0].split(' '));
    let mut card_number_split = linesplit[0].split(' ').collect::<Vec<&str>>();
    card_number_split.retain(|&x| x != "");
    let card_number = card_number_split[1].parse::<i32>().unwrap();
    let numberssplit = linesplit[1].split('|').collect::<Vec<&str>>();
    let winning_numbers = numberssplit[0].trim().split(' ').collect::<Vec<&str>>();
    let numbers = numberssplit[1].trim().split(' ').collect::<Vec<&str>>();
    let mut won: i32 = 0;
    for number in numbers {
        if number == "" {
            continue;
        }
        if winning_numbers.contains(&number) {
            won += 1;
            let index = card_number as usize + won as usize;
            if scores.contains_key(&index) {
                card_score += scores.get(&index).unwrap();
            } else {
                let score = caclculate_score_for_card(index, cards.clone(), scores);
                scores = score.1.clone();
                scores.insert(index, score.0);
                card_score += score.0;
            }
           
        }
    }
    (card_score + won, scores)
}*/

/**
 * cards: Vec<&str> = vec![
    "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"
];
 */
fn get_generated_cards_for_card(card_number: usize, cards: Vec<&str>, generated_cards_cache: HashMap<usize, Vec<usize>>) -> Vec<usize> {
    let mut generated_cards: Vec<usize> = vec![];
    
    let line = cards[card_number-1];
    let linesplit = line.split(':').collect::<Vec<&str>>();
    let numberssplit = linesplit[1].split('|').collect::<Vec<&str>>();

    let winning_numbers = numberssplit[0].trim().split(' ').collect::<Vec<&str>>();
    let numbers = numberssplit[1].trim().split(' ').collect::<Vec<&str>>();
    
    let mut card_score = 0;
    for number in numbers {
        if number == "" {
            continue;
        }
        if winning_numbers.contains(&number) {
            card_score += 1;
            let index_to_add = card_number as usize + card_score as usize;
            
            if index_to_add <= cards.len() {
                generated_cards.push(index_to_add);
                if generated_cards_cache.contains_key(&index_to_add) {
                    generated_cards.append(&mut generated_cards_cache.get(&index_to_add).unwrap().clone());
                } else {
                    generated_cards.append(&mut get_generated_cards_for_card(index_to_add, cards.clone(), generated_cards_cache.clone()));
                }
            }
        }
    }
    generated_cards
}

fn solve_for_totalscratchcards(file_path: &str) -> usize {
    println!("In file {}", file_path);
    let mut cards: HashMap<usize, usize> = HashMap::new();
    let mut generated_cards: HashMap<usize, Vec<usize>> = HashMap::new();
    let input = fs::read_to_string(file_path).expect("Something went wrong reading the file");
    let lines: Vec<&str> = input.lines().collect();
    for line in lines.clone().into_iter().rev() {
        let linesplit = line.split(':').collect::<Vec<&str>>();
        let mut card_number_split = linesplit[0].split(' ').collect::<Vec<&str>>();
        card_number_split.retain(|&x| x != "");
        let card_number = card_number_split[1].parse::<usize>().unwrap();
        
        *cards.entry(card_number).or_insert(0) += 1;
        
        let generated_cards_for_card: Vec<usize>;

        if generated_cards.contains_key(&card_number) {
            generated_cards_for_card = generated_cards.get(&card_number).unwrap().clone();
        } else {
            generated_cards_for_card = get_generated_cards_for_card(card_number, lines.clone(), generated_cards.clone());
            generated_cards.insert(card_number, generated_cards_for_card.clone());
        }

        for generated_card in generated_cards_for_card.clone() {
            if cards.contains_key(&generated_card) {
                *cards.entry(generated_card).or_insert(0) += 1 * cards[&card_number];
            } else {
                *cards.entry(generated_card).or_insert(0) += 1;
            }
        }
    }
    cards.values().cloned().collect::<Vec<usize>>().iter().sum()
}
fn main() {
    assert_eq!(solve("./data/input.4.test.txt"), 13, "Day 4 part 1 test file did not suceed");
    assert_eq!(solve("./data/input.4.txt"), 21088, "Day 4 part 1 did not succeed");
    assert_eq!(solve_for_totalscratchcards("./data/input.4.test.txt"), 30, "Day 4 part 2 test file did not suceed");
    assert_eq!(solve_for_totalscratchcards("./data/input.4.txt"), 6874754, "Day 4 part 2 did not succeed");
}