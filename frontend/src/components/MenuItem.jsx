const MenuItem = ({ name, price, description, image }) => {
    return (
      <div className="border rounded-lg p-4 shadow-md max-w-xs">
        <img src={image} alt={name} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-lg font-bold mt-2">{name}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-green-500 font-semibold mt-2">${price}</p>
      </div>
    );
  };
  
  export default MenuItem;
  