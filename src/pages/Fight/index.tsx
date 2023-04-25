import axios from "axios";
import { useEffect, useState } from "react";
import { Character } from "../../../models/character";

const Fight = () => {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [fightLog, setFightLog] = useState<string[]>();
  const [characters, setCharacters] = useState([] as Character[]);

  useEffect(() => {
    axios.get(`https://localhost:7136/api/Character/GetAll`, {}).then((res) => {
      setCharacters(res.data.data);
    });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const characterId1 = event.target.characterId1.value;
    const characterId2 = event.target.characterId2.value;
    const characterIds = [characterId1, characterId2];

    const response = await axios.post(`https://localhost:7136/api/Fight`, {
      characterIds: characterIds,
    });
    console.log(response.data.data);
    setFightLog(response.data.data.log);
  };

  return (
    <div>
      <h3>Select characters to fight:</h3>
      <form
        action=""
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "15rem", gap: "5px" }}
      >
        <label htmlFor="characterId">First Character</label>
        <select name="characterId1" id="characterId">
          {characters.map((character) => (
            <option key={character.id} value={character.id}>
              {character.name}
            </option>
          ))}
        </select>
        <label htmlFor="characterId2">Second Character</label>
        <select name="characterId2" id="characterId">
          {characters.map((character) => (
            <option key={character.id} value={character.id}>
              {character.name}
            </option>
          ))}
        </select>
        <button type="submit">Fight</button>
      </form>
      {fightLog && (
        <>
          <h3>The fight begins:</h3>
          <div>
            {fightLog.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Fight;
