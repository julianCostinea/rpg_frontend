import axios from "axios";
import { useEffect, useState } from "react";
import { Character } from "../../../models/character";

const AddWeapon = () => {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [fetchResultMessage, setFetchResultMessage] = useState<string>();
  const [characters, setCharacters] = useState([] as Character[]);

  useEffect(() => {
    axios.get(`https://localhost:7136/api/Character/GetAll`, {}).then((res) => {
      setCharacters(res.data.data);
    });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await axios.post(
      `https://localhost:7136/api/Weapon/`,
      {
        name: event.target.name.value,
        damage: event.target.damage.value,
        characterId: event.target.characterId.value,
      },
    );
    setFetchResultMessage(response.data.message);
  };
  return (
    <div>
      {fetchResultMessage && <h3>{fetchResultMessage}</h3>}
      <h3>Add Weapon</h3>
      <form
        action=""
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "15rem", gap: "5px" }}
      >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="damage">Damage</label>
        <input type="number" name="damage" id="damage" />
        <label htmlFor="characterId">Character</label>
        <select name="characterId" id="characterId">
          {characters.map((character) => (
            <option key={character.id} value={character.id}>
              {character.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Weapon</button>
      </form>
    </div>
  );
};

export default AddWeapon;
