export function calcBowlingScore(score: Array<string | number>): number {
  let total: number = 0;
  for (let i = 0; i < score.length; i++) {
    const bowl = score[i];
    const nextBowl = score[i + 1];
    const followingBowl = score[i + 2];
    if (typeof bowl === "number") {
      // Add simple numbers
      total += bowl;
    } else if (bowl === "/") {
      // Handle spares
      if (i < score.length - 1) {
        // A spare as the final bowl is calculated differently
        const prevBowl = score[i - 1] as number;
        total += 10 - prevBowl;
        if (typeof nextBowl === "number") {
          total += nextBowl;
        } else {
          total += 10;
        }
      }
    } else if (bowl === "X") {
      // Handle strikes
      if (i < score.length - 2) {
        // A strike on the final bowl is handled differently
        total += 10;
        if (nextBowl === "X" && followingBowl === "X") {
          total += 20;
        } else if (nextBowl === "X" && typeof followingBowl === "number") {
          total += 10 + followingBowl;
        } else if (typeof nextBowl === "number" && followingBowl === "/") {
          total += 10;
        } else if (
          typeof nextBowl === "number" &&
          typeof followingBowl === "number"
        ) {
          total += nextBowl + followingBowl;
        }
      }
    }
  }

  // Handle adjustments when the final hit is spare or strike
  if (score.at(-2) === "/") {
    // If the player gets a spare on the 2nd-to-last bowl,
    // they only get the score from it once, not twice,
    // so we need to adjust for this: (the FOR loop will
    // have thoughtlessly & incorrectly added the number score)
    if (typeof score.at(-1) === "number") {
      total -= score.at(-1) as number;
    }
  } else if (score.at(-3) === "X") {
    // Likewise, if they get a strike on their last turn, adjustments are needed
    if (typeof score.at(-2) === "number" && typeof score.at(-1) === "number") {
      total = total - (score.at(-1) as number) - (score.at(-2) as number);
    }
    if (typeof score.at(-2) === "number" && score.at(-1) === "/") {
      total -= score.at(-2) as number;
    }
    if (score.at(-2) === "X" && typeof score.at(-1) === "number") {
      total -= score.at(-1) as number;
    }
  }
  console.log(total);
  return total;
}
