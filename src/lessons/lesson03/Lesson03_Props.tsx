import Lesson02_Components from "../lesson02/Lesson02_Components";

function Greeting({ name }: { name: string }) {
  return <p>Hi, {name}</p>;
}

export default function Lesson03_Props() {
  return (
    <div >
      <Lesson02_Components />
      <Greeting name="Sơn" />
    </div>
  );
}
