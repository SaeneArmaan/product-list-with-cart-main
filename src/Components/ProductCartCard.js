import DeleteBtn from "../assets/images/icon-remove-item.svg";
import DeleteBtnD from "../assets/images/icon-remove-item-dark.svg";
import "../styles/ProductCartCard.css";

export const ProductCartCard = ({
  productName,
  quantity,
  price,
  totalPrice,
  cart,
  setCart,
}) => {
  const deleteItem = (productName) => {
    const newCart = cart.filter((item) => item.productName !== productName);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const onMouseOver = (event) => {
    const src = event.target;
    const img = event.target.querySelector("img");

    img?.setAttribute("src", DeleteBtnD);
    src.style.borderColor = "var(--rose-900)";
  };

  const onMouseLeave = (event) => {
    const src = event.target;
    const img = event.target.querySelector("img");

    img?.setAttribute("src", DeleteBtn);
    src.style.borderColor = "";
  };

  return (
    <section className="cartWrapper">
      <div className="productNameCart">
        <h2>{productName}</h2>
        <div>
          <span>{quantity}x</span>
          <p>
            @${price} <span>${totalPrice}</span>
          </p>
        </div>
      </div>
      <div
        className="imgWrapperCart"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <img
          src={DeleteBtn}
          alt="deleteButtonCart"
          onClick={() => deleteItem(productName)}
        />
      </div>
    </section>
  );
};
