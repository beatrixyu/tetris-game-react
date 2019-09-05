import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos";

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}></StyledCell>
  // <StyledCell type={"L"} color={TETROMINOS["L"].color}></StyledCell>
);

export default React.memo(Cell); //only re-render the cells when the cells changing, for memory the cell and only rerender when its changing
