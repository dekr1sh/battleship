import "./style.css";
import { createBoard } from "./modules/dom.js";

const playerBoardElement = document.querySelector('#containerOne .board');
const computerBoardElement = document.querySelector('#containerTwo .board');

createBoard(playerBoardElement);
createBoard(computerBoardElement);