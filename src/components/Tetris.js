import React, { useState } from "react";

import { createStage, checkCollision } from "../gameHelpers";
// can be removed because this part has removed to the State

//styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

//Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = () => {
  // console.log(createStage());

  //hooks

  const [dropTime, setDropTime] = useState(null); //initialized to show the text of game
  const [gameOver, setGameOver] = useState(false); //when its false, then it turns to be gameover

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log("re-render");

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  }; //dir=direction

  const startGame = () => {
    //reset everything
    setStage(createStage()); //to make a function to create stage
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    //increase level when play has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);

      //for increase speed
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //game over
      if (player.pos.y < 1) {
        console.log("game over!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    console.log("interval on");
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
        // drop();
      }
    }
  };

  const dropPlayer = () => {
    console.log("interval off");
    setDropTime(null); // to stop the interval
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        //37 is the code for left arrow
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        //upkeyboard to change the transform
        playerRotate(stage, 1);
      }
    }
  };

  //for set up a dropping time for the teterminos
  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score:${score}`} />
              <Display text={`Rows:${rows}`} />
              <Display text={`Level:${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
          {/* callback instead of onClick, because inside of startbutton is {callback} props */}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
