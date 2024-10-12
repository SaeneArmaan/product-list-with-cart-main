import { ProductCard } from "./Components/ProductCardDesserts";
import { ProductCartCard } from "./Components/ProductCartCard";
import { OrderConfirmed } from "./Modals/OrderConfirmed";
import { useEffect, useState } from "react";
import CarbonIll from "./assets/images/icon-carbon-neutral.svg";
import CartIll from "./assets/images/illustration-empty-cart.svg";
import "./styles/App.css";

function App() {
  const [totalQauntity, setTotalQuantity] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [state, setState] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [data, setData] = useState();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    let totalOrder = 0;
    cart?.forEach((item) => {
      totalOrder = totalOrder + item.totalPrice;
    });
    setOrderTotal(totalOrder);
  }, [cart]);

  useEffect(() => {
    let totalQauntity = 0;
    cart?.forEach((item) => {
      totalQauntity = totalQauntity + item.quantity;
    });
    setTotalQuantity(totalQauntity);
  }, [cart]);

  useEffect(() => {
    if (state === true) {
      document.body.style.overflow = "hidden";
    } else if (state === false) {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [state]);

  return (
    <main>
      <section className="contentWrapper">
        <section className="productsWrapper">
          <h1>Desserts</h1>
          <div className="products">
            {data &&
              data.map((pro, index) => {
                return (
                  <ProductCard
                    key={index}
                    category={pro.category}
                    productName={pro.name}
                    price={pro.price}
                    cart={cart}
                    setCart={setCart}
                  />
                );
              })}
          </div>
        </section>

        <section className="cart">
          <h1>Your Cart ({totalQauntity})</h1>
          {cart.length === 0 ? (
            <div className="emptyCartIll">
              <img src={CartIll} alt="" />
              <p>Your added items will appear here</p>
            </div>
          ) : (
            <div className="cartProductWrapper">
              {cart?.map((item, index) => {
                return (
                  <ProductCartCard
                    key={index}
                    productName={item.productName}
                    quantity={item.quantity}
                    price={item.price}
                    totalPrice={item.totalPrice}
                    cart={cart}
                    setCart={setCart}
                  />
                );
              })}

              <div className="orderTotal">
                <p>Order Total</p>
                <h2>${orderTotal}</h2>
              </div>

              <div className="carbonAlert">
                <img src={CarbonIll} alt="carbonIllustration" />
                <p>
                  This is a <strong>carbon-neutral</strong> delivery
                </p>
              </div>

              <button onClick={() => setState(true)}>Confirm Order</button>
            </div>
          )}
        </section>

        {state && (
          <OrderConfirmed
            setState={setState}
            cart={cart}
            setCart={setCart}
            orderTotal={orderTotal}
          />
        )}
      </section>

    </main>
  );
}

export default App;
