import AddToCartIll from "../assets/images/icon-add-to-cart.svg";
import AddBtn from "../assets/images/icon-increment-quantity.svg";
import AddBtnB from "../assets/images/icon-increment-quantity-brown.svg";
import RemBtn from "../assets/images/icon-decrement-quantity.svg";
import RemBtnB from "../assets/images/icon-decrement-quantity-brown.svg";
import { imageUrlD, imageUrlM, imageUrlT } from "../Utilites/ImageImports";
import { useEffect, useState } from "react";
import "../styles/ProductCard.css";

export const ProductCard = ({
  category,
  productName,
  price,
  cart,
  setCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [clientWidth, setClientWidth] = useState(
    document.documentElement.clientWidth
  );

  useEffect(() => {
    const updateClientWidth = () => {
      window.addEventListener("resize", () => {
        setClientWidth(document.documentElement.clientWidth);
      });
    };
    updateClientWidth();
  }, []);

  useEffect(() => {
    const setImageUrl = () => {
      if (clientWidth < 480) {
        const pImg = Object.entries(imageUrlM).find(([key, value]) =>
          productName.includes(key) ? value : null
        );
        setProductImage(pImg);
      } else if (clientWidth > 480 && clientWidth < 850) {
        const pImg = Object.entries(imageUrlT).find(([key, value]) =>
          productName.includes(key) ? value : null
        );
        setProductImage(pImg);
      } else if (clientWidth > 850) {
        const pImg = Object.entries(imageUrlD).find(([key, value]) =>
          productName.includes(key) ? value : null
        );
        setProductImage(pImg);
      }
    };
    setImageUrl();
  }, [clientWidth, productName]);

  useEffect(() => {
    const updateStatus = () => {
      const item = cart.find((item) => item.productName === productName);

      if (item) {
        setQuantity(item.quantity);
      } else {
        setQuantity(1);
      }
    };
    updateStatus();
  }, [cart, productName]);

  useEffect(() => {
    const updateStatus = () => {
      if (cart.find((item) => item.productName === productName)) {
        setIsAdded(true);
      } else {
        setIsAdded(false);
      }
    };
    updateStatus();
  }, [cart, productName]);

  const addToCart = () => {
    const product = {
      productName: productName,
      quantity: 1,
      price: price,
      totalPrice: price,
    };
    setCart((prev) => [...prev, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  const increase = (productName) => {
    const newCart = cart.map((item) =>
      item.productName === productName
        ? {
            ...item,
            quantity: (item.quantity += 1),
            totalPrice: (item.totalPrice += item.price),
          }
        : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setQuantity((prev) => (prev += 1));
  };

  const decrease = (productName) => {
    if (quantity === 1) {
      const newCart = cart.filter((item) => item.productName !== productName);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    } else {
      const newCart = cart.map((item) =>
        item.productName === productName
          ? {
              ...item,
              quantity: (item.quantity -= 1),
              totalPrice: (item.totalPrice -= item.price),
            }
          : item
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setQuantity((prev) => (prev -= 1));
    }
  };

  const onMouseOver = (event) => {
    const btn = event.target;
    const div = btn.parentElement;

    if (btn.alt === "decreaseBtn") {
      btn.setAttribute("src", RemBtnB);
      div.style.backgroundColor = "white";
    } else {
      btn.setAttribute("src", AddBtnB);
      div.style.backgroundColor = "white";
    }
  };

  const onMouseOut = (event) => {
    const btn = event.target;
    const div = btn.parentElement;

    if (btn.alt === "decreaseBtn") {
      btn.setAttribute("src", RemBtn);
      div.style.backgroundColor = "";
    } else {
      btn.setAttribute("src", AddBtn);
      div.style.backgroundColor = "";
    }
  };

  return (
    <div className="pro">
      <div className="imageWrapperPro">
        <img
          className={isAdded === true ? "activeImg" : ""}
          src={productImage ? productImage[1] : ""}
          alt="productImage"
        />

        {isAdded ? (
          <div className={"addToCartBtn activeCartBtn"}>
            <div>
              {" "}
              <img
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                src={RemBtn}
                alt="decreaseBtn"
                onClick={() => {
                  decrease(productName);
                }}
              />
            </div>
            <p>{quantity}</p>
            <div>
              {" "}
              <img
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                src={AddBtn}
                alt="increaseBtn"
                onClick={() => {
                  increase(productName);
                }}
              />
            </div>
          </div>
        ) : (
          <div className={"addToCartBtn"} onClick={addToCart}>
            <img src={AddToCartIll} alt="addToCartButtonIllustration" />
            <p>Add to Cart</p>
          </div>
        )}
      </div>

      <div className="detailsWrapperPro">
        <p>{category}</p>
        <h2>{productName}</h2>
        <p>${price}</p>
      </div>
    </div>
  );
};
