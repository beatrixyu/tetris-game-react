import { useState, useEffect, useCallback } from "react";

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200]; // means from 1 line to 4 lines cleared

  const calcScore = useCallback(() => {
    // we have score
    if (rowsCleared > 0) {
      setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows(prev => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]); //put var into the array to change and create initial loop

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]); //as independency
  return [score, setScore, rows, setRows, level, setLevel];
};
