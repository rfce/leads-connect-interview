import "./css/Cart.css"
import { useContext, useState, useEffect } from "react"
import { BiSearch } from "react-icons/bi"
import { BsCart4 } from "react-icons/bs"
import { MdChevronLeft } from "react-icons/md"
import { CartContext } from "../App"
import Logo from "../assets/Logo.jpg"
import RupeeIcon from "../assets/Rupee.png"
import CartItem from "../components/CartItem"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const [products, setProducts] = useState([])
    const [searchProduct, setSearchProduct] = useState("")
    
    const navigate = useNavigate()

    const {state, actions} = useContext(CartContext)

    useEffect(() => {
        const init = async () => {
            const response = await axios.get("https://fakestoreapi.com/products")

            setProducts(response.data)
        }

        init()
    }, [])

    const padding = (price) => {
        if (price.length === 4) {
            return "pinesap-fohs zero"
        }
        if (price.length === 5) {
            return "pinesap-fohs micro"
        }
        if (price.length === 6) {
            return "pinesap-fohs mini"
        }
        if (price.length === 7) {
            return "pinesap-fohs mega"
        }
        return "pinesap-fohs"
    }

    return (
        <div className="_9rch">
            <div className="navigation">
                <div className="logo-container">
                    <img src={Logo} alt="" />
                    <span>Store</span>
                </div>
                <div className="tones-seas">
                    <div className="hosts-vast">
                        <input 
                            placeholder="Search for products"
                            value={searchProduct} 
                            onChange={e => setSearchProduct(e.target.value)} 
                        />
                        <div>
                            <BiSearch />
                        </div>
                    </div>
                    <div className="beery-lime">
                        <button>Login</button>
                    </div>
                    <div className="chigetai-pop">
                        <BsCart4 />
                        <span>{state.totalItemsCount}</span>
                    </div>
                </div>
             </div>
             <div className="container">
                <div>
                    <div className="rankest-duet" onClick={() => navigate("/")}>
                        <MdChevronLeft />
                        <span>Go to homepage</span>
                    </div>
                    {state.cart.map((item, index) => {
                        return <CartItem key={index} item={item} products={products} />
                    })}
                </div>
                <div>
                    <div className={padding(String(state.totalCost))}>
                        <h4>Subtotal ({state.totalItemsCount} items):</h4>
                        <img src={RupeeIcon} alt="" />
                        <span>{state.totalCost}</span>
                        <div className="suets-pups">
                            <button>Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
}

export default Cart
