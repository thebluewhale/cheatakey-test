export const leven = (presentedText, submittedText) => {
  let presentedTextLength = presentedText.length + 1;
  let submittedTextLength = submittedText.length + 1;
  let dist = new Array(presentedTextLength);
  for (let i = 0; i < presentedTextLength; i++) {
    dist[i] = new Array(submittedTextLength);
  }

  for (let i = 0; i < submittedTextLength; i++) {
    dist[0][i] = i;
  }
  for (let i = 0; i < presentedTextLength; i++) {
    dist[i][0] = i;
  }
  let cost = 0;
  for (let i = 1; i < presentedTextLength; i++) {
    for (let j = 1; j < submittedTextLength; j++) {
      if (presentedText[i - 1] != submittedText[j - 1]) {
        cost = 1;
      } else {
        cost = 0;
      }
      let addNum = dist[i - 1][j] + 1;
      let minusNum = dist[i][j - 1] + 1;
      let modiNum = dist[i - 1][j - 1] + cost;
      let minNum = Math.min(addNum, minusNum, modiNum);
      dist[i][j] = minNum;
    }
  }
  let diff = dist[presentedTextLength - 1][submittedTextLength - 1];
  return (presentedText.length - diff) / presentedText.length;
};

export const calcCompetitionPoint = (presentedText, leadTime, accuracy) => {
  // one seconds means about 3 points, because average type speed is 180 per min.
  // const ONE_SECOND_POINT = (38 * 5) / 60;
  // let expectedLeadTime = presentedText.length / ONE_SECOND_POINT;
  // let timePoint = (expectedLeadTime - leadTime / 1000) * ONE_SECOND_POINT;
  // let typingPoint = presentedText.length * accuracy;
  // return timePoint + typingPoint;
  let speed = (
    ((presentedText.length * Number.parseFloat(accuracy)) / leadTime) *
    60 *
    1000
  ).toFixed(0);
  return Number.parseFloat(speed) + Number.parseFloat(accuracy * 100);
};
