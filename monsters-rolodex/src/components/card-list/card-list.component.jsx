// import { Component } from "react"; class component
import Card from "../card/card.component";
import "./card-list.styles.css";

// functional component
const CardList = ({ monsters }) => (
  <div className="card-list">
    {monsters.map((monster) => {
      return <Card monster={monster} />;
    })}
  </div>
);

export default CardList;

// class component
// class CardList extends Component {
//   render() {
//     console.log("render from cardlist");
//     const { monsters } = this.props;

//     return (
//       <div className="card-list">
//         {monsters.map((monster) => {
//           return <Card monster={monster} />;
//         })}
//       </div>
//     );
//   }
// }
// export default CardList;
