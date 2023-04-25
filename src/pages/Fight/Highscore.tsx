import axios from "axios";
import { useEffect, useState } from "react";
import { highscoreResult } from "../../../models/fight";

const HighScore = () => {
  const [highscoreResults, setHighscoreResults] = useState<highscoreResult[]>();
  useEffect(() => {
    axios.get(`https://localhost:7136/api/Fight/Highscore`, {}).then((res) => {
      setHighscoreResults(res.data.data);
    });
  }, []);
  return (
    <div>
      <h3>Highscore</h3>
      {highscoreResults &&
        highscoreResults.map((highscoreResult, index) => (
          <div key={highscoreResult.id}>
            <p>Character{highscoreResult.name}</p>
            <p>Place: {index + 1} </p>
            <p>Fights: {highscoreResult.fights}</p>
            <p>Victories: {highscoreResult.victories}</p>
            <p>Defeats: {highscoreResult.defeats}</p>
            <br />
          </div>
        ))}
    </div>
  );
};

export default HighScore;
