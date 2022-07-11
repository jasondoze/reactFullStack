import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

// import logo from "./logo.svg";
import "./App.css";

// class Component
class App extends Component {
  // constructor always runs first
  constructor() {
    super();
    // initialize the state
    this.state = {
      monsters: [],
      // access the search in the state- empty string is null case
      // this searchField entry in state allows us to filter from the full list of monsters and re-render the original list of monsters as we unfilter in the search bar
      searchField: "",
    };
    console.log("constructor");
  }

  // the mounting runs last on this page
  // lifecycle method componentDidMount
  // first time the component shows up on the page on render with componentDidMount
  // return the response as json with .then- converting over to json
  // console log the users to see the returned users

  componentDidMount() {
    console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }
  // anonymous function that is not stored in a variable and gets thrown away, every time render runs the function is created
  // one function like this is no problem, but many would slow down the component
  onSearchChange = (event) => {
    console.log(event.target.value);
    // create a variable to change the event target value to lowercase
    const searchField = event.target.value.toLocaleLowerCase();
    // reset the state to filtered monsters
    // we want to store this in the entire component where state is accessible, react
    // so we can move this into our class component
    this.setState(() => {
      return { searchField };
    });
  };

  // render runs second
  render() {
    console.log("render");
    // destructuring to reduce variable names- optimization
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // filter out the names in the search box to include only the monsters input typed
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monstrosities</h1>
        <SearchBox
          className="search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;

/*
// class Component
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: { firstName: "Jason", lastName: "Chadwick" },
      company: "xyz",
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hola {this.state.name.firstName} {this.state.name.lastName}, I work
            at {this.state.company}
          </p>
          <button
            onClick={() => {
              // set state is shallow merge with current state object- updates state to a new object
              this.setState(
                () => {
                  return {
                    name: { firstName: "Melina", lastName: "Mattos" },
                  };
                },
                // this logging function will run a callback for the state after the set state has changed so as not to log synchronously and actually give the wrong log of the previous instead of current state
                () => {
                  console.log(this.state);
                }
              );
            }}
          >
            Change Name
          </button>
        </header>
      </div>
    );
  }
}

functional Component
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          welcome to react bitchez
        </a>
      </header>
    </div>
  );
}
*/
