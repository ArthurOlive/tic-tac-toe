import { useState } from 'react';
import './static/css/app/index.css'


export default function GameLoop() {

  const PLAYERX = 'x';
  const PLAYERO = 'o';

  const [gameOver , setGameOver]    = useState(false);
  const [gameState, setGameState]   = useState(Array<String>(9).fill(''))
  const [info, setInfo]             = useState("jogada da vez: " + PLAYERX);
  const [vez, setVez]               = useState(PLAYERX)
  const [numJogadas, setNumJogadas] = useState(0);

  const swap = () => {
    if (!gameOver){ 
      if(vez === PLAYERX) {
        setVez(PLAYERO);
        setInfo("jogada da vez: " + PLAYERO);
      } else {
        setVez(PLAYERX);
        setInfo("jogada da vez: " + PLAYERX);
      }
    }
  }

  const validate = (arr : Array<String>) => {

    let gameOver = false;
    
    //diagonal
    if ((arr[0] !== '' && (arr[0] === arr[4] && arr[0] === arr[8])) || 
        (arr[2] !== '' && (arr[2] === arr[4] && arr[2] === arr[6]))) {
      gameOver = true;
    }

    if ((arr[0] !== '' && (arr[0] === arr[3] && arr[0] === arr[6])) || 
        (arr[1] !== '' && (arr[1] === arr[4] && arr[1] === arr[7])) || 
        (arr[2] !== '' && (arr[2] === arr[5] && arr[2] === arr[8]))) {
      gameOver = true;
    }
    
    if ((arr[0] !== '' && (arr[0] === arr[1] && arr[0] ===  arr[2])) || 
        (arr[3] !== '' && (arr[3] === arr[4] && arr[3] === arr[5])) || 
        (arr[6] !== '' && (arr[6] === arr[7] && arr[6] === arr[8]))) {
      gameOver = true;
    }

    if (gameOver) {
      setInfo(`Fim de jogo, ${vez} vencedor`);
      setGameOver(true);
    } else {
      if (numJogadas === 8) {
        setInfo(`Fim de jogo, velha`)
        setGameOver(true);
      }
    }
  }

  const gameLoop = (arr : Array<String>) => {

    if (!gameOver) {

      swap();
      setNumJogadas(numJogadas+1);
      validate(arr);
      
    }

  }

  const setPosition = (i : number) => {

    if (!gameOver) {
      let arr = [...gameState]
      arr[i] = vez;
      setGameState(arr);

      gameLoop(arr);
    }
  
  }

  return (
    <div className="container">
      <div className="tab">
        <div className="title-content"> 
          <span>{info}</span>
        </div>
        <div className="game">
          <div className="table">
            {gameState.map((val, i) => {
              return (
                <div className="case">
                  <div className="content-case" onClick={() => setPosition(i)}>{val}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}