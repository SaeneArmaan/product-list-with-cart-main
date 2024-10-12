import { imageUrlTh } from "../Utilites/ImageImports";
import "../styles/OrderConfirmedCard.css";

export const OrderConfirmedCard = ({
  productName,
  quantity,
  price,
  totalPrice,
}) => {
  const thImg = Object.entries(imageUrlTh).find(([key, value]) =>
    productName.includes(key) ? value : null
  );

  return (
    <section className="orderCardWrapper">
      <div className="orderDetailsWrapper">
        <img src={thImg ? thImg[1] : ""} alt="" />
        <div>
          <h2>{productName}</h2>
          <div>
            <span>{quantity}x</span>
            <p>@${price}</p>
          </div>
        </div>
      </div>

      <h1>${totalPrice}</h1>
    </section>
  );
};
