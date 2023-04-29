import "./css/ProductBox.css"
import RupeeIcon from "../assets/Rupee.png"
import { AiTwotoneStar } from "react-icons/ai"
import { CgShoppingCart } from "react-icons/cg"
import { useState, useContext, useEffect } from "react"
import { CartContext } from "../App"

const ProductBox = ({ item, setNotification }) => {
    const [quantity, setQuantity] = useState(1)
    const [hasExpandButton, setHasExpandButton] = useState(false)
    const [descriptionMin, setDescriptionMin] = useState(true)
    const { state, actions } = useContext(CartContext)

    useEffect(() => {
        const width = window.innerWidth
        
        if (width < 600) {
            setHasExpandButton(true)
        }
    }, [])

    return (
        <div className="product-box">
            <div className="donairs-hes">
                {item.category}
            </div>
            <div className="product-image">
                <img src={item.image} alt=""/>
            </div>
            <div className="product-details">
                <div>
                    <h2>{item.title}</h2>
                    {hasExpandButton === false ? <div className="blinker-ohs">
                        {item.category}
                    </div> : undefined}
                    <div className="price">
                        <img src={RupeeIcon} alt="Rupee symbol (india)" />
                        <span>{String(item.price).split(".")[0]}.</span>
                        <span className="usable-dear">{String(item.price).split(".")[1] ? String(item.price).split(".")[1].padEnd(2, "0") : "00"}</span>
                        <span className="corset-conk">MRP</span>
                    </div>
                    <div className="ratings">
                        <div className="convoy-mind">
                            <span>{item.rating.rate}</span>
                            <AiTwotoneStar />
                        </div>
                        <span>{item.rating.count} ratings</span>
                    </div>
                    <div className="description">
                        <h4>Description</h4>
                        <div>
                            {hasExpandButton ? (descriptionMin ? item.description.slice(0,135) : item.description) : item.description}
                        </div>
                        {item.description.length > 135 && hasExpandButton ? 
                            <span onClick={() => setDescriptionMin(prev => !prev)}>{descriptionMin ? "more" : "less"}</span> : undefined}
                    </div>
                </div>
                <div className="fermatas-voe">
                    <div className="critique-net">
                        <span>Qty</span>
                        <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" max="10" />
                    </div>
                    <button onClick={() => actions.setCart(prev => {
                        setNotification(`${item.title} added to cart`)
                        const index = prev.findIndex(element => element.id === item.id)
                        const copy = [...prev]
                        if (index === -1) {
                            copy.push({ id: item.id, price: item.price, quantity })
                        } else {
                            copy[index].quantity = copy[index].quantity + quantity
                        }
                        return copy
                    })}>
                        <CgShoppingCart />
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductBox
