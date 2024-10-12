import { useEffect, useRef } from "react";
import ConfirmedIll from "../assets/images/icon-order-confirmed.svg";
import { OrderConfirmedCard } from "../Components/OrderConfirmedCard";
import "../styles/OrderConfirmed.css";

export const OrderConfirmed = ({ setState, cart, setCart, orderTotal }) => {
  const orderConRef = useRef();

  useEffect(() => {
    let isAtTop = true;
    const width = document.documentElement.clientWidth;

    if (orderConRef) {
      orderConRef.current.addEventListener("scroll", () => {
        const scroll = orderConRef.current.scrollTop;

        if (scroll > 10 && isAtTop && width <= 480) {
          orderConRef.current.style.borderRadius = "0px";
          isAtTop = false;
        } else if (scroll < 10 && !isAtTop && width <= 480) {
          orderConRef.current.style.borderRadius = "20px 20px 0px 0px";
          isAtTop = true;
        }
      });
    }
  }, []);

  const newOrder = () => {
    setCart([]);
    setState(false);
    localStorage.removeItem("cart");
  };

  return (
    <>
      {" "}
      <div className="modalLayer" onClick={() => setState(false)}></div>
      <main className="orderConWrapper" ref={orderConRef}>
        <section className="headingOrderCon">
          <img src={ConfirmedIll} alt="confirmedIllustration" />
          <div>
            <h1>Order Confirmed</h1>
            <p>We hope you enjoy your food!</p>
          </div>
        </section>

        <section className="cartOrderCon">
          <div className="orderList">
            {cart?.length !== 0
              ? cart.map((item, index) => (
                  <OrderConfirmedCard
                    key={index}
                    productName={item.productName}
                    quantity={item.quantity}
                    price={item.price}
                    totalPrice={item.totalPrice}
                  />
                ))
              : null}
          </div>
          <div className="orderListTotal">
            <p>Order Total</p>
            <h2>${orderTotal}</h2>
          </div>
        </section>

        <button className="continueBtn" onClick={newOrder}>
          Start New Order
        </button>
      </main>
    </>
  );
};
