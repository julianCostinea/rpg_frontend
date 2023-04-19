import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Character } from "../../../models/character";

const Character = () => {
  const router = useRouter();
  const { cid } = router.query;
  const [fetchedCharacter, setFetchedCharacter] = useState<Character>();

  useEffect(() => {
    if (cid) {
      const token = localStorage.getItem("token");
      axios
        .get<{ data: Character }>(`https://localhost:7136/api/Character/${cid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setFetchedCharacter(res.data.data);
        });
    }
  }, [cid]);

  return (
    fetchedCharacter && (
      <div>
        <h1>Character: </h1>
        <h3>Name: {fetchedCharacter.name}</h3>
        <p>Hit Points: {fetchedCharacter.hitPoints}</p>
        <p>Strength: {fetchedCharacter.strength}</p>
        <p>Defense: {fetchedCharacter.defense}</p>
        <p>Intelligence: {fetchedCharacter.intelligence}</p>
        <p>Class: {fetchedCharacter.class}</p>
      </div>
    )
  );
};

export default Character;
