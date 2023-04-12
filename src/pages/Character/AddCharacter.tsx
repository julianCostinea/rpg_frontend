import axios from "axios";

const AddCharacter = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const name = event.target.name.value;
    const hitPoints = event.target.hitPoints.value;
    const response = await axios.post(
      `https://localhost:7136/api/Character/`,
      {
        name: name,
        HitPoints: hitPoints,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const response = axios.get(`https://localhost:7136/api/Character/GetAll`).then((res) => {
    //   console.log(res.data);
    // });
    console.log(response.data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="hitPoints">HitPoints</label>
        <input type="number" name="hitPoints" id="hitPoints" />
        <button type="submit">Add Character</button>
      </form>
    </div>
  );
};

export default AddCharacter;
