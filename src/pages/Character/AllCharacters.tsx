import axios from "axios";
import { useEffect, useState } from "react";
import { Character } from "../../../models/character";
import Link from "next/link";

const Character = () => {
  const [characters, setCharacters] = useState([] as Character[]);
  const handleDelete = (id: number) => async () => {
    await axios.delete(`https://localhost:7136/api/Character/${id}`);
    setCharacters(characters.filter((character) => character.id !== id));
  };

  useEffect(() => {
    axios.get(`https://localhost:7136/api/Character/GetAll`).then((res) => {
      setCharacters(res.data.data);
    });
  }, []);

  return (
    <div>
      <h1>All Characters: </h1>
      {characters.map((character) => (
        <div key={character.id}>
          <h3>{character.name}</h3>
          <p>Hit Points: {character.hitPoints}</p>
          <p>Strength: {character.strength}</p>
          <p>Defense: {character.defense}</p>
          <p>Intelligence: {character.intelligence}</p>
          <p>Class: {character.class}</p>
          <button onClick={handleDelete(character.id)}>Delete</button>
          <Link href={`/Character/UpdateCharacter/${character.id}`}>
            <button>Update</button>{" "}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Character;
