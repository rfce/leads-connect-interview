import "./css/CartItem.css"
import RupeeIcon from "../assets/Rupee.png"
import { AiTwotoneStar } from "react-icons/ai"
import { MdUpdate, MdDeleteOutline } from "react-icons/md"
import { useState, useContext, useEffect } from "react"
import { CartContext } from "../App"

const CartItem = ({ item, products }) => {
    const [quantity, setQuantity] = useState(item.quantity)

    const product = products[item.id - 1]
    const { state, actions } = useContext(CartContext)

    useEffect(() => {
        setQuantity(item.quantity)
    }, [item])

    return (
        <div className="_7njk">
            <div className="product-box">
                <div className="product-image">
                    <img src={product && product.image} alt=""/>
                </div>
                <div className="product-details">
                    <div>
                        <h2>{product && product.title}</h2>
                        <div className="price">
                            <img src={RupeeIcon} alt="Rupee symbol (india)" />
                            <span>{String(product && product.price).split(".")[0]}.</span>
                            <span className="usable-dear">{String(product && product.price).split(".")[1] ? String(product && product.price).split(".")[1].padEnd(2, "0") : "00"}</span>
                            <span className="corset-conk">MRP</span>
                        </div>
                        <div className="ratings">
                            <div className="convoy-mind">
                                <span>{product && product.rating.rate}</span>
                                <AiTwotoneStar />
                            </div>
                            <span>{product && product.rating.count} ratings</span>
                        </div>
                    </div>
                    <div className="fermatas-voe">
                        <div className="critique-net">
                            <span>Qty</span>
                            <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" max="10" />
                        </div>
                        <button onClick={() => actions.setCart(prev => {
                            const index = prev.findIndex(element => element.id === item.id)
                            const copy = [...prev]
                            copy[index].quantity = quantity
                            return copy
                        })}>
                            <MdUpdate />
                            Update
                        </button>
                        <button 
                            className="bilge-fox"
                            onClick={() => actions.setCart(prev => {
                                return prev.filter(element => element.id !== item.id)
                            })}
                        >
                            <MdDeleteOutline />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
