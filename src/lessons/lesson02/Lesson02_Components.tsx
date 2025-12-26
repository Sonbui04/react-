import Lesson01_HelloReact from "../lesson01/Lesson01_HelloReact";

function Header() {
  return <header>Header</header>;
}

function Footer() {
  return <footer>Footer</footer>;
}

export default function Lesson02_Components() {
  return (
    <div style={{ padding: 20 }}>
      {}
      <Lesson01_HelloReact />

      <hr />

      {}
      <h2>Lesson 02 - Components</h2>
      <Header />
      <Footer />
    </div>
  );
}
