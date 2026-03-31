import { Link } from "react-router";
import "./CartItem.css";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/helper";
function CartItem({ id, title, image, quantity, currentPrice, totalPrice }) {
  const [quantityCart, setQuantityCart] = useState(quantity);
  const formattedCurrentPrice = formatPrice(currentPrice);
  const formattedTotalPrice = formatPrice(totalPrice);
  const { addItemToCart, subQuantityFromCart, removeItemFromCart } = useCart();

  function handleAddQuantity() {
    setQuantityCart((prev) => prev + 1);
    addItemToCart(id, 1);
  }

  function handleSubQuantity() {
    if (quantityCart > 0) {
      setQuantityCart((prev) => prev - 1);
      subQuantityFromCart(id, 1);
    }
  }

  return (
    <div className="cart-item">
      <Link to={`/products/${id}`} className="cart-item-image">
        <img src={image} alt={title} />
      </Link>

      <div className="cart-item-details">
        <Link to={`/products/${id}`} className="cart-item-title">
          <h4>{title}</h4>
        </Link>
        <p className="cart-item-price">{formattedCurrentPrice}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button className="quantity-btn" onClick={handleSubQuantity}>
            -
          </button>
          <span className="quantity-display">{quantityCart}</span>
          <button className="quantity-btn" onClick={handleAddQuantity}>
            +
          </button>
        </div>
        <p className="cart-item-total">{formattedTotalPrice}</p>
        <button
          className="remove-btn"
          aria-label="Remove item"
          onClick={() => removeItemFromCart(id)}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
