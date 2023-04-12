import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Character } from "../../../../models/character";

const UpdateCharacter = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    if (uid) {
      axios.get(`https://localhost:7136/api/Character/${uid}`).then((res) => {
        setCharacter(res.data.data);
      });
    }
  }, [uid]);

  const [fetchResultMessage, setFetchResultMessage] = useState<string>();
  const handleUpdate = async (event: any) => {
    event.preventDefault();
    const response = await axios.put(
      `https://localhost:7136/api/Character/`,
      {
        Id: uid,
        name: event.target.name.value,
        HitPoints: event.target.hitPoints.value,
        Strength: event.target.strength.value,
        Defense: event.target.defense.value,
        Intelligence: event.target.intelligence.value,
        Class: event.target.rpgClass.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setFetchResultMessage(response.data.message);
  };
  return (
    <div>
      {fetchResultMessage && <h3>{fetchResultMessage}</h3>}
      {character && (
        <form
          action=""
          onSubmit={handleUpdate}
          style={{ display: "flex", flexDirection: "column", width: "15rem", gap: "5px" }}
        >
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" defaultValue={character.name} />
          <label htmlFor="hitPoints">HitPoints</label>
          <input type="number" name="hitPoints" id="hitPoints" defaultValue={character.hitPoints} />
          <label htmlFor="strength">Strength</label>
          <input type="number" name="strength" id="strength" defaultValue={character.strength} />
          <label htmlFor="defense">Defense</label>
          <input type="number" name="defense" id="defense" defaultValue={character.defense} />
          <label htmlFor="intelligence">Intelligence</label>
          <input type="number" name="intelligence" id="intelligence" defaultValue={character.intelligence} />
          <label htmlFor="class">Class</label>
          <select name="rpgClass" id="rpgClass" defaultValue={character.class}>
            <option value="Knight">Knight</option>
            <option value="Mage">Mage</option>
            <option value="Cleric">Cleric</option>
          </select>{" "}
          <button type="submit">Update Character</button>
        </form>
      )}
    </div>
  );
};

export default UpdateCharacter;
