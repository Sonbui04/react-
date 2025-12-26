type GreetingProps = {
  name?: string;
};

function Greeting({ name = "Guest" }: GreetingProps) {
  return <p>Hi, {name}</p>;
}
export default function Lesson04_DefaultProps() {
  return (
    <div >
    <Greeting />
    </div>
  );
}
