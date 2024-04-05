use std::fs;

pub fn solve_day6_part1(filename: &str) -> usize {
    let input = fs::read_to_string(filename).expect("Something went wrong reading the file");
    let lines = input.lines().collect::<Vec<&str>>();
    let times = lines[0].split(':').collect::<Vec<&str>>()[1].split(' ').filter(|&x| x != "").map(|x| x.parse::<usize>().unwrap()).collect::<Vec<usize>>();
    let distances = lines[1].split(':').collect::<Vec<&str>>()[1].split(' ').filter(|&x| x != "").map(|x| x.parse::<usize>().unwrap()).collect::<Vec<usize>>();
    let mut total = 0;
    for x in 0..times.len() {
        let mut number_of_wins = 0;
        // println!("Time: {}, distance: {}", times[x], distances[x]);
        for y in 0..times[x] {
            let left_to_run = times[x] - y;
            // println!("Left to run: {}, which means distance traveled should be {}", left_to_run, left_to_run * y);
            if left_to_run * y > distances[x] {
                // println!("Winning configuration: distance: {}, time: {}", distances[x], left_to_run);
                number_of_wins += 1;
            }
        }
        if total == 0 {
            total = number_of_wins;
        } else {
            total *= number_of_wins;
        
        }
    }
        
    // println!("total: {:?}", total);
    total
}

fn find_first_winning(time: usize, distance: usize) -> Option<usize> {
    let mut last_winning = None;
    for x in (1..(time/1000)*200).rev() {
        let time_left = time - x;
        let traveled_distance = x * time_left;
        if !last_winning.is_none() && distance > traveled_distance {
            return Some(x+1);
        }
        if distance < traveled_distance {
            last_winning = Some(x);
        }
    }
    last_winning
}

fn find_last_winning(time: usize, distance: usize) -> Option<usize> {
    let mut last_winning = None;
    for x in (time/1000)*800..time {
        let time_left = time - x;
        let traveled_distance = x * time_left;
        if !last_winning.is_none() && distance > traveled_distance {
            return Some(x-1);
        }
        if distance < traveled_distance {
            last_winning = Some(x);
        }
    }
    None
}

/*fn unoptimized_solution() {
    /*for x in (distance_record/time)..time {
        println!("Time: {}, distance: {}", x, distance_record);
        /*for y in 0..times[x] {
            
            /*let distance = distances[x] * y;
            let time = times[x] - y;
            println!("Distance: {}, time: {}", distance, time);
            if distance % time == 0 {
                println!("Winning configuration: distance: {}, time: {}", distance, time);
                break;
            }*/
        }*/
        
        
        let time_left = time - x;
        let traveled_distance = x * time_left;
        if distance_record < traveled_distance {
            println!("Winning configuration: distance: {}, time: {}", traveled_distance, time_left);
            total += 1;
        } 
    }*/
        
}*/

pub fn solve_day6_part2(filename: &str) -> usize {
    let input = fs::read_to_string(filename).expect("Something went wrong reading the file");
    let lines = input.lines().collect::<Vec<&str>>();
    
    let time = lines[0].split(':').collect::<Vec<&str>>()[1].split(' ').filter(|&x| x != "").collect::<Vec<&str>>().join("").parse::<usize>().unwrap();
    let distance_record = lines[1].split(':').collect::<Vec<&str>>()[1].split(' ').filter(|&x| x != "").collect::<Vec<&str>>().join("").parse::<usize>().unwrap();

    let first_winning = find_first_winning(time, distance_record);
    let last_winning = find_last_winning(time, distance_record);
    
    // println!("First winning: {:?}, last winning: {:?}", first_winning, last_winning);
    if first_winning.is_none() || last_winning.is_none() {
        return 0;
    }

    // println!("Range: {} - {} total: {}", first_winning.unwrap(), last_winning.unwrap(), last_winning.unwrap() - first_winning.unwrap() + 1);
    last_winning.unwrap() - first_winning.unwrap() + 1
}