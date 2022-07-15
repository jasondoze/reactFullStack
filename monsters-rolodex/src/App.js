// import { Component } from "react"; // used for class components
import { useState, useEffect } from "react"; // used for creating hooks
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

// import logo from "./logo.svg";
import "./App.css";

// writing a functional component
// a react functional component takes arguments that are the props of this component and then runs as JSX
const App = () => {
  console.log("render");

  // use state will ecapsulate individual values from that state, each hook only hooks into one value
  const [searchField, setSearchField] = useState(""); // [value, setValue]
  const [title, setTitle] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  // the only time this function is called is on mount due to the empty array dependency
  useEffect(() => {
    console.log("effect fired");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  // the return of a functional component renders the UI
  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>

      <SearchBox
        className="search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <br />
      <SearchBox
        className="title-search-box"
        onChangeHandler={onTitleChange}
        placeholder="set title"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// writing a class Component
// class App extends Component {
// constructor always runs first
// constructor() {
//   super();
// initialize the state
// this.state = {
//   monsters: [],
// access the search in the state- empty string is null case
// this searchField entry in state allows us to filter from the full list of monsters and re-render the original list of monsters as we unfilter in the search bar
//     searchField: "",
//   };
//   console.log("constructor");
// }

// the mounting runs last on this page
// lifecycle method componentDidMount
// first time the component shows up on the page on render with componentDidMount
// return the response as json with .then- converting over to json
// console log the users to see the returned users

// componentDidMount() {
//   console.log("componentDidMount");
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json())
//     .then((users) =>
//       this.setState(
//         () => {
//           return { monsters: users };
//         },
//         () => {
//           console.log(this.state);
//         }
//       )
//     );
// }
// anonymous function that is not stored in a variable and gets thrown away, every time render runs the function is created
// one function like this is no problem, but many would slow down the component
// onSearchChange = (event) => {
//   console.log(event.target.value);
// create a variable to change the event target value to lowercase
// const searchField = event.target.value.toLocaleLowerCase();
// reset the state to filtered monsters
// we want to store this in the entire component where state is accessible, react
// so we can move this into our class component
//   this.setState(() => {
//     return { searchField };
//   });
// };

// render runs second
// render() {
//   console.log("render");
// destructuring to reduce variable names- optimization
// const { monsters, searchField } = this.state;
// const { onSearchChange } = this;

// filter out the names in the search box to include only the monsters input typed
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monstrosities</h1>
//         <SearchBox
//           className="search-box"
//           onChangeHandler={onSearchChange}
//           placeholder="search monsters"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
