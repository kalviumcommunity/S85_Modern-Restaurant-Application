import "./App.css";
import MenuItem from "./components/MenuItem";

const App = () => {
  const sampleMenuItem = {
    name: "Spicy Paneer Pizza",
    price: 12.99,
    description: "A delicious spicy paneer pizza with fresh toppings and extra cheese.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-dUdkyqtoNcatcBg6ighRZsdQnqsAREwtFw&s",
  };

  return (
    <div className="container">    
      <div className="menu-section">
        <h2 className="section-title">Featured Dish</h2>
        <MenuItem {...sampleMenuItem} />
      </div>
    </div>
  );
};

export default App;
