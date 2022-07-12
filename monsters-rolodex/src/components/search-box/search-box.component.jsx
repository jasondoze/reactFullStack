// import { Component } from "react";
import "./search-box.styles.css";

const SearchBox = ({ className, placeholder, onChangeHandler }) => (
  <input
    className={className}
    // gererate a search field with an x to clear the field
    type="search"
    placeholder={placeholder}
    // we changed this to not re-run everytime its intialized
    onChange={onChangeHandler}
  />
);

export default SearchBox;

// class Component
// class SearchBox extends Component {
//   render() {
//     return (
//       <input
//         className={this.props.className}
//         // gererate a search field with an x to clear the field
//         type="search"
//         placeholder={this.props.placeholder}
//         // we changed this to not re-run everytime its intialized
//         onChange={this.props.onChangeHandler}
//       />
//     );
//   }
// }

// export default SearchBox;
