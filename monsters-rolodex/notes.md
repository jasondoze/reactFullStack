DOM Changes:

Imperative approach - difficult to see all the events and edge cases

Declarative approach - react holds the blueprint of the object. Declares the state of the data of our object. All states included in one object without touching the DOM

React- react based on the state

React Concepts: 
1. Don't touch the DOM
2. Build websites like lego blocks
3. Unidirectional data flow- one way data flow is easy to debug
4. React is just the UI, the rest is up to you

State- the data of our app- a state change causes the react to react and change the data accordingly
Components- html like syntax inside of javascript or JSX
VirtualDOM- a javascript version of the DOM- a blueprint for the actual DOM

Job of a React developer
1. Decide on Components
2. Decide the State and whereit lives
3. What changes when state changes

REACT BASICS
npx create-react-app monsters-rolodex

npm list <name> check the path of the react app

"scripts": {
  start: creates the framework for the app
  build: takes our local data files and pushes it to the local host/ groups together all the app files for optimization by condensing them into code gibberish
  tests: checks to see if the code does what we want it to do...testing the apps.js file
  eject: babbel condenses JS into a version understood by different browsers/ webpack takes the .chunk.js and modularizes the code into self contained portions one piece at a time for speed and optimization-- eject will spit out the files and/or modify those babbel/ webpack

}

A component is a self contained piece of code that returns a UI representation of the code

Classes vs Hooks

Quick note: React 18 Strict Mode
One quick note about React 18 Strict Mode (the mode we generally always run React in!), for better debugging they've started doing a double invocation for certain things in a components lifecycle! If you see renders twice, this will be why! In React 17 console.log was automatically suppressed, but with React 18 they've stopped suppressing them.

You can read more about it here. https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects


JSX 
syntax extension that allows similar html usage

Class Component
Allows us to tell react when to render or re render things

Object.assign()
is method used to create a new object from another objects template

Lifecycle methods
component DidMount etc...

Components re-render based on two conditions:
when set state gets called 
when props gets updated

Functional components instead of Class components
written as arrow functions
a react functional component takes arguments that are the props of this component and then runs as JSX

class Component
<!-- class App extends Component {
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
} -->

functional Component
<!-- function App() {
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
} -->



const App = () => {
the return of a functional component renders the UI

Pure function- a function that returns the same no matter how many times its called

Impure function- when a function has external variables that can change the return

useEffect
to access variables outside of a pure function, useEffect hooks must be used inside the function

useEffect takes two arguments, a callback function contains the code or effect we want to happen in our functional component
the second array will contain the values, whenever any values inside the array change, the callback function will be ran every time there is a change
useEffect(() => {}, [])