// import { useState } from 'react'
import { useState } from "react";
import "./App.css";
import data from "./data.json";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const categories = data.data.categories;
const products = data.data.products;

function App() {
  const [active, setActive] = useState("all");
  const [openCart, setOpenCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <>
      <Header
        openCart={openCart}
        setOpenCart={setOpenCart}
        active={active}
        setActiveTab={setActive}
      ></Header>
      <CartBackgroundCover
        openCart={openCart}
        setOpenCart={setOpenCart}
      ></CartBackgroundCover>
      {active === "viewProductPage" ? (
        <ProductPage selectedProduct={selectedProduct}></ProductPage>
      ) : (
        <Cards
          setSelectedProduct={setSelectedProduct}
          active={active}
          setActive={setActive}
        ></Cards>
      )}
    </>
  );
}

function Header({ active, setActiveTab, openCart, setOpenCart }) {
  return (
    <div className="header-container">
      <div className="header flex items-center justify-between">
        <div className="category-container flex flex-row justify-around items-center">
          {categories.map((data) => (
            <HeaderCategory
              key={data.name}
              title={data.name}
              active={active}
              setActiveTab={setActiveTab}
            ></HeaderCategory>
          ))}
        </div>
        <div className="logo-div">
          <img
            src="src\assets\logo-transparent.png"
            className="header-logo"
          ></img>
        </div>
        <Cart openCart={openCart} setOpenCart={setOpenCart}></Cart>
      </div>
    </div>
  );
}
function CartBackgroundCover({ openCart, setOpenCart }) {
  if (openCart) {
    return (
      <div
        className="background-cover"
        onClick={() => setOpenCart(false)}
      ></div>
    );
  }
}
function Cart({ openCart, setOpenCart }) {
  return (
    <div className="cart">
      <img
        src="src\assets\logo-transparent.png"
        className="cart-logo"
        onClick={() => setOpenCart(!openCart)}
      ></img>
    </div>
  );
}
function HeaderCategory({ title, active, setActiveTab }) {
  return (
    <button
      onClick={() => setActiveTab(title)}
      className={(active === title ? "active " : "") + "category-btn"}
    >
      <p>{title.toUpperCase()}</p>
    </button>
  );
}

function Cards({ setSelectedProduct, active, setActive }) {
  return (
    <div className="body-container">
      <div className="category-title">
        <h1>{active.toUpperCase()}</h1>
      </div>
      <div className="card-container grid grid-cols-3 gap-y-10">
        {products.map(function (product) {
          if (product.category === active || active === "all") {
            return (
              <ProductCard
                key={product.id}
                product={product}
                setSelectedProduct={setSelectedProduct}
                setActive={setActive}
              ></ProductCard>
            );
          }
        })}
      </div>
    </div>
  );
}

function ProductCard({ product, setSelectedProduct, setActive }) {
  return (
    <div
      className="product-card flex align-center"
      onClick={() => {
        setSelectedProduct(product);
        setActive("viewProductPage");
      }}
    >
      <div className="card-content">
        <div
          className={
            (product.inStock === false ? "out-of-stock" : "") +
            " card-image-container"
          }
        >
          {product.inStock === false ? (
            <div className="out-of-stock-text">OUT OF STOCK</div>
          ) : (
            ""
          )}
          <img className="card-image" src={product.gallery[0]}></img>
        </div>
        <div className="add-to-cart-circle" onClick={() => console.log("hi")}>
          <img src="src\assets\icon-empty-cart-white.png"></img>
        </div>

        <h1 className="card-product-name">{product.name}</h1>
        <h2 className="card-price">
          {product.prices[0].currency.symbol + product.prices[0].amount}
        </h2>
      </div>
    </div>
  );
}

function ProductPage({ selectedProduct }) {
  const [activeVariant, setActiveVariant] = useState({});
  const [carouselImage, setCarouselImage] = useState(0);
  return (
    <div className="body-container-product">
      <CarouselPreview
        setCarouselImage={setCarouselImage}
        selectedProduct={selectedProduct}
      ></CarouselPreview>
      <CarouselLarge
        selectedProduct={selectedProduct}
        carouselImage={carouselImage}
        setCarouselImage={setCarouselImage}
      ></CarouselLarge>
      <ProductOptions
        activeVariant={activeVariant}
        setActiveVariant={setActiveVariant}
        selectedProduct={selectedProduct}
      ></ProductOptions>
    </div>
  );
}

function CarouselPreview({ setCarouselImage, selectedProduct }) {
  const [carouselPreview, setCarouselPreview] = useState([0, 4]);
  return (
    <div className="images-small-preview">
      {carouselPreview[0] !== 0 ? (
        <div
          className="carousel-up flex justify-center align-center"
          onClick={() =>
            setCarouselPreview([carouselPreview[0] - 5, carouselPreview[1] - 5])
          }
        >
          <img src="src\assets\CaretLeft.png"></img>
        </div>
      ) : (
        ""
      )}
      {selectedProduct.gallery.map((image, index) =>
        index >= carouselPreview[0] && index <= carouselPreview[1] ? (
          <div
            className="small-image-container"
            onClick={() => setCarouselImage(index)}
          >
            <img
              className="small-image"
              src={selectedProduct.gallery[index]}
            ></img>
          </div>
        ) : (
          ""
        )
      )}
      {carouselPreview[0] === 0 && selectedProduct.gallery.length > 5 ? (
        <div
          className="carousel-down flex justify-center align-center"
          onClick={() =>
            setCarouselPreview([carouselPreview[0] + 5, carouselPreview[1] + 5])
          }
        >
          <img src="src\assets\CaretRight.png"></img>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function CarouselLarge({ selectedProduct, setCarouselImage, carouselImage }) {
  return (
    <div className="carousel">
      {carouselImage > 0 ? (
        <div
          className="carousel-back flex justify-center align-center"
          onClick={() => setCarouselImage(carouselImage - 1)}
        >
          <img src="src\assets\CaretLeft.png"></img>
        </div>
      ) : (
        ""
      )}
      <img
        className="carousel-image"
        src={selectedProduct.gallery[carouselImage]}
      ></img>
      {carouselImage < selectedProduct.gallery.length - 1 ? (
        <div
          className="carousel-forward flex justify-center align-center"
          onClick={() => setCarouselImage(carouselImage + 1)}
        >
          <img src="src\assets\CaretRight.png"></img>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function ProductOptions({ selectedProduct, activeVariant, setActiveVariant }) {
  let cleanHTML = DOMPurify.sanitize(selectedProduct.description, {
    USE_PROFILES: { html: true },
  });
  const attributes = selectedProduct.attributes;
  return (
    <div className="options-container">
      <div className="title-container">
        <h1 className="title">{selectedProduct.name}</h1>
      </div>
      <div className="attributes-container">
        {attributes.map((attribute) => (
          <Attribute
            setActiveVariant={setActiveVariant}
            activeVariant={activeVariant}
            attribute={attribute}
          ></Attribute>
        ))}
      </div>
      <div className="price-title">PRICE:</div>
      <div className="product-price">$399.99</div>
      <div className="btn-add-to-cart">ADD TO CART</div>
      <div className="description">{parse(cleanHTML)}</div>
    </div>
  );
}

function Attribute({ attribute, setActiveVariant, activeVariant }) {
  return (
    <div className={"attribute " + attribute.type}>
      <div className="attribute-title">{attribute.id.toUpperCase() + ":"}</div>
      <div className="attribute-selector flex">
        {attribute.items.map((item) => (
          <div
            className={
              (activeVariant[attribute.id] === item.value ? "active" : "") +
              " select-button " +
              attribute.type
            }
            onClick={() =>
              setActiveVariant((prev) => ({
                ...prev,
                [attribute.id]: item.value,
              }))
            }
          >
            {attribute.type !== "swatch" ? (
              item.value
            ) : (
              <div
                className="color-pick"
                style={{ backgroundColor: item.value }}
                onClick={() =>
                  setActiveVariant((prev) => ({
                    ...prev,
                    Color: item.value,
                  }))
                }
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
