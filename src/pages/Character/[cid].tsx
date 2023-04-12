import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Character = () => {
  const router = useRouter();
  const { cid } = router.query;

  useEffect(() => {
    if (cid) {
      axios.get(`https://localhost:7136/api/Character/`).then((res) => {
        console.log(res.data);
      });
    }
  }, [cid]);

  return <p>Character: {cid}</p>;
};

export default Character;
