import axios from "axios";
import { useState } from "react";

const AddCharacter = () => {
  const [fetchResultMessage, setFetchResultMessage] = useState<string>();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await axios.post(
      `https://localhost:7136/api/Character/`,
      {
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
      <form
        action=""
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "15rem", gap: "5px" }}
      >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="hitPoints">HitPoints</label>
        <input type="number" name="hitPoints" id="hitPoints" />
        <label htmlFor="strength">Strength</label>
        <input type="number" name="strength" id="strength" />
        <label htmlFor="defense">Defense</label>
        <input type="number" name="defense" id="defense" />
        <label htmlFor="intelligence">Intelligence</label>
        <input type="number" name="intelligence" id="intelligence" />
        <label htmlFor="class">Class</label>
        <select name="rpgClass" id="rpgClass">
          <option value="1">Knight</option>
          <option value="2">Mage</option>
          <option value="3">Cleric</option>
        </select>
        <button type="submit">Add Character</button>
      </form>
    </div>
  );
};

export default AddCharacter;
