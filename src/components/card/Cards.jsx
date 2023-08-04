import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Card.scss";

export default function Cards({ title, price, img1, img2, img3, id }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    const product = {
      id: id,
      title: title,
      image: img1,
      count: 1,
      price: price,
    };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index === -1) {
      cart.push({ ...product, count: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(true);
    } else {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(false);
    }
  }
  return (
    <>
      <div className="container">
        <div className="card">
          <Swiper
            modules={[Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              <img width={"100%"} height={"400px"} src={img1} alt="swiper" />
            </SwiperSlide>
            <SwiperSlide>
              <img width={"100%"} height={"400px"} src={img2} alt="swiper" />
            </SwiperSlide>
            <SwiperSlide>
              <img width={"100%"} height={"400px"} src={img3} alt="swiper" />
            </SwiperSlide>
          </Swiper>
          <div className="card-content">
            <a className="card__title" href={`/product/${id}`}>
              <b>{title}</b>
            </a>
            <span className="card__price">{`$${price}`}</span>
            <button onClick={handleAddToCart} className="card__btn">
              {added ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
