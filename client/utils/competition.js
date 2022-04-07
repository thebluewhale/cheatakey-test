export const leven = (presentedText, submittedText) => {
  let dist = new Array(presentedText.length + 1)
    .fill(0)
    .map(() => new Array(submittedText.length + 1).fill(0));

  for (let row = 0; row < dist.length; row++) {
    dist[row][0] = row;
  }
  for (let col = 0; col < dist[0].length; col++) {
    dist[0][col] = col;
  }

  for (let row = 1; row < dist.length; row++) {
    for (let col = 1; col < dist[0].length; col++) {
      if (submittedText.charAt(col - 1) !== presentedText.charAt(row - 1)) {
        dist[row][col] =
          1 +
          Math.min(
            dist[row - 1][col],
            dist[row][col - 1],
            dist[row - 1][col - 1]
          );
      } else {
        dist[row][col] =
          1 +
          Math.min(
            dist[row - 1][col],
            dist[row][col - 1],
            dist[row - 1][col - 1] - 1
          );
      }
    }
  }
  let diff = dist[submittedText.length][presentedText.length];
  return (presentedText.length - diff) / presentedText.length;
};

export const calcCompetitionPoint = (presentedText, leadTime, accuracy) => {
  // one seconds means about 3 points, because average type speed is 180 per min.
  const ONE_SECOND_POINT = (38 * 5) / 60;
  let expectedLeadTime = presentedText.length / ONE_SECOND_POINT;
  let timePoint = (expectedLeadTime - leadTime / 1000) * ONE_SECOND_POINT;
  let typingPoint = presentedText.length * accuracy;
  console.log(timePoint, typingPoint);
  return (timePoint + typingPoint).toFixed(3) * 10;
};
