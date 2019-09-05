import { useState, useCallback } from "react";
//usecallbcak is the standard react hook

import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  //change the direction of tertomino
  const rotate = (matrix, dir) => {
    // amke the rows to become columns (transpose)
    //_ means not use actual value in this loop
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index])
    );

    //reverse each row to get < retated matrix
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    //to do a deep clone
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    //to have a deep clone so that a JSON.Parse is needed
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    //to avoid the tetrios come outside of the screen frame
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      //to make the tertomino stop moving when it stucks in the middle of other tertominios
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir); //reverse the direction
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  //update player position
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided
    })); //pos = position
  };

  // const playerState = useState();
  // const player = playerState[0];
  // const setPlayer

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
