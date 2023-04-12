import axios from "axios";
import { useEffect } from "react";

const Character = () => {
  useEffect(() => {
    axios.get(`https://localhost:7136/api/Character/GetAll`).then((res) => {
      console.log(res.data);
    });
  }, []);

  return <p>All Characters: </p>;
};

export default Character;
