mod five;
mod six;
mod seven;
use five::{solve_day5_part1, solve_day5_part2};
use six::solve_day6_part1;
use six::solve_day6_part2;
use seven::solve_day7_part1;
use seven::solve_day7_part2;

fn main() {
    // Day 5
    //assert_eq!(solve_part1("./data/input.5.test.txt"), Some(35), "Day 5 part 1 test file did not suceed");
    //let solution = solve_part1("./data/input.5.txt");
    //assert_ne!(solution, None, "Day 5 part 1 solution is None");
    //assert_eq!(solution.unwrap(), 322500873, "Day 5 part 1 solution is correct");
    //assert_eq!(solve_day5_part2("./data/input.5.test.txt"), Some(46), "Day 5 part 2 test file did not suceed");
    // let solution = solve_day5_part2("./data/input.5.txt");
    // assert_ne!(solution, None, "Day 5 part 1 solution is None");
    
    
    // Day 6
    assert_eq!(solve_day6_part1("./data/input.6.test.txt"), 288, "Day 6 part 1 solution is not correct");
    assert_eq!(solve_day6_part1("./data/input.6.txt"), 2756160, "Day 6 part 1 solution is not correct");
    assert_eq!(solve_day6_part2("./data/input.6.test.txt"), 71503, "Day 6 part 2 solution is not correct");
    assert_eq!(solve_day6_part2("./data/input.6.txt"), 34788142, "Day 6 part 2 solution is not correct");
    
    // Day 7
    //assert_eq!(solve_day7_part1("./data/input.7.test.txt"), 6440, "Day 7 part 1 solution is not correct");
    //assert_eq!(solve_day7_part1("./data/input.7.txt"), 253205868, "Day 7 part 1 solution is not correct");
    assert_eq!(solve_day7_part2("./data/input.7.test.txt"), 5905, "Day 7 part 2 solution is not correct");
    // less than 254206857
    // higher than 253667419
    let answer_day7_part2 = solve_day7_part2("./data/input.7.txt");
    assert_ne!(answer_day7_part2, 254206857, "Day 7 part 2 solution is not correct");
    assert_ne!(answer_day7_part2, 253667419, "Day 7 part 2 solution is not correct");
}