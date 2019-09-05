import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";
import { arrayExpression } from "babel-types";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0); //initial number create for set up how many rows moved and culculate scores

  //to set up th interval
  useEffect(() => {
    setRowsCleared(0); // to send this to the useGameStatus.js
    //to reduce the row
    const sweepRows = (
      newStage //ack=accumulater
    ) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);

          //unshift is to make the rows disappeared and new empty rows will show up
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []); //the empty array for stocking the accumlation

    const updateStage = prevStage => {
      //first flush the stage
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell))
      ); //[0 retrun empty cell]//this related to the gameHelper array

      //then draw the tetromino
      //loop
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            //give the position of x and y
            newStage[y + player.pos.y][x + player.pos.x] = [
              //value is from tetromino
              value,
              `${player.collided ? "merged" : "clear"}`
            ];
          }
        });
      });
      //then check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer
  ]);

  //this return callback all the functions above
  return [stage, setStage, rowsCleared];
};
