import { Component } from "react";

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
    };
  }
  // the mounting runs last on this page
  // lifecycle method componentDidMount
  // first time the component shows up on the page on render with componentDidMount
  // return the response as json with .then- converting over to json
  // console log the users to see the returned users
  componentDidMount() {
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
  // render runs second
  render() {
    return (
      <div className="App">
        {
          // iterates over all the elements in the array and returns a new array
          this.state.monsters.map((monster) => {
            // key values allow react to focus on changing one element via a key instead of rendering all elements again
            return (
              <div key={monster.id}>
                <h1>{monster.name}</h1>
              </div>
            );
          })
        }
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
