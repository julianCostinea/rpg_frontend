import axios from "axios";
import { useEffect, useState } from "react";
import { Character } from "../../../models/character";
import Link from "next/link";
import { useRouter } from "next/router";

const AllCharacters = () => {
  const router = useRouter();
  const [characters, setCharacters] = useState([] as Character[]);
  const handleDelete = (id: number) => async () => {
    await axios.delete(`https://localhost:7136/api/Character/${id}`);
    setCharacters(characters.filter((character) => character.id !== id));
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .get(`https://localhost:7136/api/Character/GetAll`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data);

        setCharacters(res.data.data);
      });
  }, [router.isReady]);

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
          <p>Weapon: {character.weapon && character.weapon.name}</p>
          <div>
            <h4>Skills: </h4>
            {character.skills && character.skills.map((skill) => <p key={skill.id}>{skill.name}</p>)}
          </div>
          <button onClick={handleDelete(character.id)}>Delete</button>
          <Link href={`/Character/UpdateCharacter/${character.id}`}>
            <button>Update</button>{" "}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllCharacters;
