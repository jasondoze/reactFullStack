const Person = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.occupation),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { class: "title" }, "React is rendered"),
    React.createElement(
      Person,
      { name: "Jason", occupation: "monkey brain eater" },
      null
    ),
    React.createElement(
      Person,
      { name: "Melina", occupation: "turtle brain eater" },
      null
    ),
  ]);
};

// ReactDOM.render(React.createElement(App), document.getElementById("root"));

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
