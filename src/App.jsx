// import { useState } from 'react'
import { useState } from 'react'
import './App.css'
import data from "./data.json"
const categories = data.data.categories
const products = data.data.products

function App() {
  const [active, setActive] = useState('all')
  const [openCart, setOpenCart] = useState(false)
  

  return (
    <>
    <Header openCart={openCart} setOpenCart={setOpenCart} active={active} setActiveTab={setActive}></Header>
    <CartBackgroundCover openCart={openCart} setOpenCart={setOpenCart}></CartBackgroundCover>
    <Cards active={active}></Cards>
    {/* <ProductPage></ProductPage> */}
    </>
  )
}

function Header({active, setActiveTab, openCart, setOpenCart}) {
  
  return (
    <div className="header-container">
    <div className="header flex items-center justify-between">
      <div className="category-container flex flex-row justify-around items-center">
        {categories.map((data)=>(<HeaderCategory key={data.name} title={data.name} active={active} setActiveTab={setActiveTab}></HeaderCategory>))}
      </div>
      <div className="logo-div">
      <img src="src\assets\logo-transparent.png" className='header-logo'></img>
      </div>
    <Cart openCart={openCart} setOpenCart={setOpenCart}></Cart>
    </div>
    </div>
  )
}
function CartBackgroundCover({openCart, setOpenCart}){
  console.log(openCart)
  if(openCart){
    return (
      <div className="background-cover" onClick={()=>setOpenCart(false)}></div>
    )
  }

}
function Cart({openCart, setOpenCart}){
  return (   
    <div className="cart">
    <img src="src\assets\logo-transparent.png" className='cart-logo' onClick={()=>setOpenCart(!openCart)}></img>
    </div>
    )
}
function HeaderCategory({title, active, setActiveTab}) {
  return( 
    <button onClick={()=>setActiveTab(title)} className={(active === title ? 'active ' : '') + 'category-btn'}>
      <p>{title.toUpperCase()}</p>
      </button>
  )
}

function Cards({active}){
return (
  <div className="body-container">
  <div className="category-title"><h1>{active.toUpperCase()}</h1></div>
  <div className="card-container grid grid-cols-3 gap-y-10">
  {products.map(function(product){
if(product.category===active || active==='all'){
  return (<ProductCard key={product.id} product={product}></ProductCard>)
}
})}
</div>
</div>
)
}

function ProductCard({product}){
  return (
    <div className="product-card flex align-center">
      <div className="card-content">
      <div className={(product.inStock===false ? "out-of-stock" : "") + " card-image-container"}>
      {product.inStock === false ? <div className="out-of-stock-text">OUT OF STOCK</div> : ""}
        <img className="card-image" src={product.gallery[0]}></img>
      </div>
      <div className="add-to-cart-circle" onClick={()=>console.log('hi')}>
        <img src="src\assets\icon-empty-cart-white.png"></img>
      </div>
      
  <h1 className="card-product-name">{product.name}</h1>
  <h2 className="card-price">{product.prices[0].currency.symbol+product.prices[0].amount}</h2>
  </div>
  </div>
  
  
  )
}

function ProductPage(){
  return <h1>ProductPage</h1>

}


export default App