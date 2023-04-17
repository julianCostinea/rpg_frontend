import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Character = () => {
  const router = useRouter();
  const { cid } = router.query;
  const [characterName, setCharacterName] = useState("");

  useEffect(() => {
    if (cid) {
      const token = localStorage.getItem("token");
      axios
        .get(`https://localhost:7136/api/Character/${cid}`)
        .then((res) => {
          setCharacterName(res.data.data.name);
        });
    }
  }, [cid]);

  return <p>Character: {characterName}</p>;
};

export default Character;
