import { Link } from "react-router";
import "./Checkout.css";
import { CircleCheckBigIcon, CreditCard, MapPin, Package } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/helper";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

const CHECKOUT_STEPS = [
  {
    id: 1,
    name: "Shipping",
    icon: <MapPin size={20} />,
    isActive: true,
  },
  {
    id: 2,
    name: "Payment",
    icon: <CreditCard size={20} />,
    isActive: false,
  },
  {
    id: 3,
    name: "Review",
    icon: <Package size={20} />,
    isActive: false,
  },
];

const FORM_STEPS = [
  [
    [
      {
        id: 1,
        label: "firstName",
        type: "text",
        name: "First Name",
        required: true,
        placeholder: "John",
      },
      {
        id: 2,
        label: "lastName",
        type: "text",
        name: "Last Name",
        required: true,
        placeholder: "Doe",
      },
    ],
    [
      {
        id: 3,
        label: "email",
        type: "email",
        name: "Email Address",
        required: false,
        placeholder: "john.doe@example.com",
      },
      {
        id: 4,
        label: "address",
        type: "text",
        name: "Address",
        required: true,
        placeholder: "123 Main St",
      },
    ],
    [
      {
        id: 5,
        label: "city",
        type: "text",
        name: "City",
        required: true,
        placeholder: "New York",
      },
      {
        id: 6,
        label: "zipcode",
        type: "text",
        name: "Zip Code",
        required: false,
        placeholder: "10001",
      },
    ],
  ],
  [
    {
      id: 1,
      label: "creditCard",
      type: "radio",
      name: "Credit / Debit Card",
    },
    {
      id: 2,
      label: "paypal",
      type: "radio",
      name: "PayPal",
    },
    {
      id: 3,
      label: "cash",
      type: "radio",
      name: "Cash on Delivery",
    },
  ],
];

function Checkout() {
  const [steps, setSteps] = useState(0);
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("creditCard");
  const [placeOrderLoading, setPlaceOrderLoading] = useState("idle");
  const { cartState, addOrder } = useCart();

  function handleShippingChange(e) {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSteps((prev) => prev + 1);
  }

  function handlePaymentChange(label) {
    setSelectedPayment(label);
  }

  function handleGoBack() {
    setSteps((prev) => prev - 1);
  }

  function handlePlaceOrder() {
    const shippingInfo = {
      name: `${shippingForm.firstName} ${shippingForm.lastName}`,
      email: shippingForm.email,
      address: shippingForm.address,
      city: shippingForm.city,
    };
    setSteps(0);
    setPlaceOrderLoading("loading");
    setTimeout(() => {
      setPlaceOrderLoading("success");
      addOrder(shippingInfo);
    }, 2000);
  }

  if (placeOrderLoading === "loading") {
    return <Loader />;
  }

  if (placeOrderLoading === "success") {
    return <OrderComplete />;
  }

  if (cartState.totalQuantity === 0) {
    return <EmptyCheckout />;
  }

  return (
    <section className="checkout-page container">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-progress">
        {CHECKOUT_STEPS.map((step, index) => (
          <Fragment key={step.id}>
            <div className={`step ${steps >= index ? "active" : ""}`}>
              <div className="step-icon">{step.icon}</div>
              {step.name}
            </div>
            {index < CHECKOUT_STEPS.length - 1 && (
              <div
                className={`step-line ${steps > index ? "active" : ""}`}
              ></div>
            )}
          </Fragment>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-container">
          {steps === 0 && (
            <ShippingPage
              datas={FORM_STEPS[steps]}
              shippingForm={shippingForm}
              onChange={handleShippingChange}
              onSubmit={handleSubmit}
              onGoBack={handleGoBack}
            />
          )}
          {steps === 1 && (
            <PaymentPage
              datas={FORM_STEPS[steps]}
              selectedPayment={selectedPayment}
              onChange={handlePaymentChange}
              onSubmit={handleSubmit}
              onGoBack={handleGoBack}
            />
          )}
          {steps === 2 && (
            <ReviewPage
              shippingForm={shippingForm}
              selectedPayment={selectedPayment}
              onGoBack={handleGoBack}
              onOrder={handlePlaceOrder}
            />
          )}
        </div>

        <div className="checkout-summary summary-items">
          <h2>Order Details</h2>
          {cartState.items.map((item) => (
            <div className="summary-item" key={item.id}>
              <div className="summary-item-info">
                <span className="summary-item-title">{item.title}</span>
                <span className="summary-item-qty">x{item.quantity}</span>
              </div>
              <span>{formatPrice(item.totalPrice)}</span>
            </div>
          ))}

          <div className="summary-divider"></div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartState.totalAmount)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{formatPrice(cartState.shipping)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row grand-total">
            <span>Total</span>
            <span>
              {formatPrice(cartState.totalAmount + cartState.shipping)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyCheckout() {
  return (
    <div className="checkout-empty">
      <h1>Your Cart is Empty</h1>
      <Link to="/products" className="checkout-empty-link">
        Go to Products
      </Link>
    </div>
  );
}

function ShippingPage({ datas, shippingForm, onChange, onSubmit }) {
  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <h3>Shipping Details</h3>
      {datas.map((row, index) => (
        <div key={index} className="form-row">
          {row.map((field) => (
            <div className="form-group" key={field.id}>
              <label htmlFor={field.label}>{field.name}</label>
              <input
                type={field.type}
                id={field.label}
                name={field.label}
                onChange={onChange}
                required={field.required}
                placeholder={field.placeholder}
                value={shippingForm[field.label] || ""}
              />
            </div>
          ))}
        </div>
      ))}

      <button type="submit" className="btn-primary w-full mt-4">
        Continue to Payment
      </button>
    </form>
  );
}

function PaymentPage({ datas, selectedPayment, onChange, onSubmit, onGoBack }) {
  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <h3>Payment Method</h3>
      <div className="payment-options">
        {datas.map((option) => (
          <div
            className={`payment-option ${selectedPayment === option.label ? "selected" : ""}`}
            key={option.id}
            onClick={() => onChange(option.label)}
          >
            <input
              type="radio"
              id={option.label}
              name="payment"
              value={option.label}
              checked={selectedPayment === option.label}
              onChange={() => onChange(option.label)}
            />
            <label htmlFor={option.label}>{option.name}</label>
          </div>
        ))}

        <div className="form-actions space-between mt-4">
          <button
            type="button"
            className="btn-secondary w-auto"
            onClick={onGoBack}
          >
            Back
          </button>
          <button type="submit" className="btn-primary">
            Review Order
          </button>
        </div>
      </div>
    </form>
  );
}

function ReviewPage({ shippingForm, selectedPayment, onGoBack, onOrder }) {
  return (
    <div className="checkout-review">
      <h3>Review Your Order</h3>
      <div className="review-section">
        <h4>Shipping To:</h4>
        <p>
          {shippingForm.firstName} {shippingForm.lastName}
        </p>
        <p>{shippingForm.city}</p>
        <p>{shippingForm.address}</p>
        <p>{shippingForm.email}</p>
      </div>
      <div className="review-section">
        <h4>Payment Method:</h4>
        <p>{selectedPayment}</p>
      </div>

      <div className="form-actions space-between mt-4">
        <button
          type="button"
          className="btn-secondary w-auto"
          onClick={onGoBack}
        >
          Back
        </button>
        <button type="button" className="btn-primary" onClick={onOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

function OrderComplete() {
  return (
    <div className="container order-success">
      <CircleCheckBigIcon className="success-icon" size={48} />
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for shopping with EcoShop.</p>
      <p>Your order details can be found in your order history.</p>
      <Link to="/orders" className="btn-primary mt-4">
        View Order Details
      </Link>
    </div>
  );
}

export default Checkout;
