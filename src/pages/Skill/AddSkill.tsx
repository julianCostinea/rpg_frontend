import axios from "axios";
import { useEffect, useState } from "react";
import { Character } from "../../../models/character";
import { Skill } from "../../../models/skill";

const AddSkill = () => {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const [fetchResultMessage, setFetchResultMessage] = useState<string>();
  const [characters, setCharacters] = useState([] as Character[]);
  const [skills, setSkills] = useState([] as Skill[]);

  useEffect(() => {
    axios.get(`https://localhost:7136/api/Skill/`, {}).then((res) => {
      setSkills(res.data.data);
    });
    axios.get(`https://localhost:7136/api/Character/GetAll`, {}).then((res) => {
      setCharacters(res.data.data);
    });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await axios.post(`https://localhost:7136/api/Character/Skill`, {
      characterId: event.target.characterId.value,
      skillId: event.target.skillId.value,
    });
    setFetchResultMessage(response.data.message);
  };
  return (
    <div>
      {fetchResultMessage && <h3>{fetchResultMessage}</h3>}
      <h3>Add Skill</h3>
      {characters && skills && (
        <form
          action=""
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "15rem", gap: "5px" }}
        >
          <label htmlFor="characterId">Character</label>
          <select name="characterId" id="characterId">
            {characters.map((character) => (
              <option key={character.id} value={character.id}>
                {character.name}
              </option>
            ))}
          </select>
          <label htmlFor="skillId">Skill</label>
          <select name="skillId" id="skillId">
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Skill</button>
        </form>
      )}
    </div>
  );
};

export default AddSkill;
