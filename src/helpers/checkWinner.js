import { winner_COMBOS } from "../constants/constants";


const checkWinner = (boardToCheck) => {
 
    for (const combo of winner_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }

    return null;
  };

  export default checkWinner;