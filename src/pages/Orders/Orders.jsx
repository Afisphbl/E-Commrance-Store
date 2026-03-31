import { Package } from "lucide-react";
import "./Orders.css";
import { Link } from "react-router";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/helper";

function Orders() {
  const { cartState } = useCart();

  if (cartState.orders.length === 0) return <EmptyOrders />;
  return (
    <section className="orders-page">
      <h1 className="page-title">Orders History</h1>
      <div className="orders-list">
        {cartState.orders.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </div>
    </section>
  );
}

function EmptyOrders() {
  return (
    <div className="container orders-empty">
      <Package size={64} className="empty-icon" />
      <h2>No orders yet</h2>
      <p>When you place an order, it will appear here.</p>
      <Link to="/products" className="btn-primary mt-4">
        Start shopping
      </Link>
    </div>
  );
}

function OrderCard({ order }) {
  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <p className="order-header-label">Order ID:</p>
          <p className="order-id">{order.orderId}</p>
        </div>

        <div>
          <p className="order-header-label">Date:</p>
          <p className="order-date">{order.date}</p>
        </div>

        <div>
          <p className="order-header-label">Total:</p>
          <p className="order-total">{formatPrice(order.total)}</p>
        </div>

        <p className="order-status processing">Processing</p>
      </div>

      <div className="order-items">
        {order.items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
      <OrderFooter shippingInfo={order.shippingInfo} />
    </div>
  );
}

function OrderItem({ item }) {
  return (
    <div className="order-item">
      <div className="order-item-img">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="order-item-info">
        <Link to={`/products/${item.id}`} className="item-title">
          {item.title}
        </Link>
        <p className="item-meta">
          Qty: {item.quantity} | {formatPrice(item.currentPrice)} each
        </p>
      </div>
    </div>
  );
}

function OrderFooter({ shippingInfo }) {
  return (
    <div className="order-footer">
      Shipped to: {shippingInfo.name}, {shippingInfo.address},{" "}
      {shippingInfo.city}, {shippingInfo.email ? shippingInfo.email : ""}
    </div>
  );
}

export default Orders;
