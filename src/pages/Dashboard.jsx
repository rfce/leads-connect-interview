import "./css/Dashboard.css"
import { BiSearch,BiChevronDown } from "react-icons/bi"
import { BsCart4, BsCheck } from "react-icons/bs"
import Logo from "../assets/Logo.jpg"
import RupeeIcon from "../assets/Rupee.png"
import HomeImage from "../assets/Categories/Home.png"
import ElectronicsImage from "../assets/Categories/Electronics.png"
import GroceriesImage from "../assets/Categories/Grocery.png"
import FashionImage from "../assets/Categories/Fashion.png"
import MobilesImage from "../assets/Categories/Mobiles.png"
import JewelriesImage from "../assets/Categories/Jewelries.jpg"
import { FiFilter,FiDelete } from "react-icons/fi"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductBox from "../components/ProductBox"
import { Pagination } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../App"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const [searchProduct, setSearchProduct] = useState("")
    const [popup, setPopup] = useState(false)
    const [category, setCategory] = useState(undefined)
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [productsCache, setProductsCache] = useState([])
    const [order, setOrder] = useState("ascending")
    const [sort, setSort] = useState("relevance")
    const [page, setPage] = useState(1)
    const [filtered, setFiltered] = useState([])
    const [offset, setOffset] = useState(0)
    const [range, setRange] = useState(6)
    const [notification, setNotification] = useState(false)

    const  { state, actions } = useContext(CartContext)

    const navigate = useNavigate()

    useEffect(() => {
        const init = async () => {
            let uri = category ? `https://fakestoreapi.com/products/category/${category}` : "https://fakestoreapi.com/products"
            
            if (order === "descending") {
                uri += "?sort=desc"
            }

            const response = await axios.get(uri)

            setPage(1)

            if (category === undefined) {
                setAllProducts(response.data)
            }
    
            if (sort === "relevance") {
                setProducts(response.data)
                setProductsCache(response.data)
            }
            else if (sort === "rating") {
                const sorted = response.data.sort((a, b) => {
                    return order === "ascending" ? b.rating.rate - a.rating.rate : a.rating.rate - b.rating.rate
                })
                
                setProducts(sorted)
                setProductsCache(sorted)
            }
            else {
                const sorted = response.data.sort((a, b) => {
                    return order === "ascending" ? b.price - a.price : a.price - b.price
                })
                setProducts(sorted)
                setProductsCache(sorted)
            }
        }

        init()
    }, [category, order, sort])

    // Filter results according to pagination
    useEffect(() => {
        const count = 6
        const start = (page - 1) * count
        const end = page * count

        const copy = []

        products.forEach((item, index) => {
            if (index >= start && index < end) {
                copy.push(item)
            }
        })
        setOffset(start)
        setRange(end)
        setFiltered(copy)
    }, [page, products])

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [notification])

    const handleSearch = () => {
        if (searchProduct) {
            setProducts(prev => {
                return prev.filter(item => {
                    return item.title.toLowerCase().includes(searchProduct.toLowerCase())
                })
            })
        }
        else {
            setProducts(productsCache)
        }
    }

    return (
        <div className="_8sid">
            {notification ? (
                <div className="notification">
                    <div className="behold-sun">
                        {notification}
                    </div>
                </div>
            ) : undefined}
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
                            <BiSearch onClick={() => handleSearch()} />
                        </div>
                    </div>
                    <div className="beery-lime">
                        <button>Login</button>
                    </div>
                    <div className="chigetai-pop" onClick={() => navigate("/cart")}>
                        <BsCart4 />
                        <span>{state.totalItemsCount}</span>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="keeling-phi">
                    <div onClick={() => setCategory(false)}>
                        <img src={GroceriesImage} alt="" />
                        <span className="chant-den">All</span>
                    </div>
                    <div className="stoup-okra">
                        <img src={MobilesImage} alt="" />
                        <span className="chant-den">Mobiles</span>
                    </div>
                    <div className={popup === "fashion" ? "dills-feud" : undefined} onClick={() => setPopup(prev => {
                        return prev === "fashion" ? false : "fashion"
                    })}>
                        <img src={FashionImage} alt="" />
                        <div className="swanlike-erg">
                            <span className="chant-den">Fashion</span>
                            <BiChevronDown />
                        </div>
                        {popup === "fashion" ? (
                            <div className="coopt-mat" onClick={e => e.stopPropagation()}>
                                <span onClick={() => setCategory("men's clothing")}>
                                    Men's clothing
                                </span>
                                <span onClick={() => setCategory("women's clothing")}>
                                    Women's clothing
                                </span>
                            </div>
                        ) : undefined}
                    </div>
                    <div onClick={() => setCategory("electronics")}>
                        <img src={ElectronicsImage} alt="" />
                        <span className="chant-den">Electronics</span>
                    </div>
                    <div className="stoup-okra">
                        <img src={HomeImage} alt="" />
                        <span className="chant-den">Home</span>
                    </div>
                    <div onClick={() => setCategory("jewelery")}>
                        <img src={JewelriesImage} alt="" />
                        <span className="chant-den">Jewelries</span>
                    </div>
                </div>
                <div className="straiter-seat">
                    <div className="filters">
                            <span className="teabag-zee">
                                <FiFilter />
                                Filters
                            </span>
                            <div className="grief-seas">
                                <span>Sort By</span>
                                <div>
                                    <div onClick={() => setSort("relevance")} className="aardwolf-cut">
                                        <div className={sort === "relevance" ? "gruffy-qat active" : "gruffy-qat"}>
                                            {sort === "relevance" ? <BsCheck /> : undefined}
                                        </div>
                                        <span>Relevance</span>
                                    </div>
                                    <div onClick={() => setSort("rating")} className="aardwolf-cut">
                                        <div className={sort === "rating" ? "gruffy-qat active" : "gruffy-qat"}>
                                            {sort === "rating" ? <BsCheck /> : undefined}
                                        </div>
                                        <span>Rating</span>
                                    </div>
                                    <div onClick={() => setSort("price")} className="aardwolf-cut">
                                        <div className={sort === "price" ? "gruffy-qat active" : "gruffy-qat"}>
                                            {sort === "price" ? <BsCheck /> : undefined}
                                        </div>
                                        <span>Price</span>
                                    </div>
                                </div>
                            </div>
                            <div className="unusual-out">
                                <span>Order</span>
                                <div>
                                    <div onClick={() => setOrder("ascending")} className="aardwolf-cut">
                                        <div className={order === "ascending" ? "gruffy-qat active" : "gruffy-qat"}>
                                            {order === "ascending" ? <BsCheck /> : undefined}
                                        </div>
                                        <span>Ascending</span>
                                    </div>
                                    <div onClick={() => setOrder("descending")} className="aardwolf-cut">
                                        <div className={order === "descending" ? "gruffy-qat active" : "gruffy-qat"}>
                                            {order === "descending" ? <BsCheck /> : undefined}
                                        </div>
                                        <span>Descending</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="bankcard-rax">
                        <div className="extracts-oven">
                            Showing {offset + 1} – {range > products.length ? products.length : range} of {products.length} results {category ? `for "${category}"` : undefined}
                        </div>
                        {filtered.map((item, index) => {
                            return (
                                <ProductBox key={index} item={item} setNotification={setNotification} />
                            )})}
                    </div>
                    <div className="pinesap-fohs">
                        <div>
                            {state.cart.map((item, index) => {
                                const prod = allProducts.find(i => i.id === item.id)
                                return (
                                    <div key={index} className="freely-floe">
                                        <span>{item.quantity}</span>
                                        <span className="shogun-seme">{prod.title}</span>
                                        <div onClick={() => actions.setCart(prev => {
                                                setNotification(`${prod.title} removed from cart`)
                                                return prev.filter(element => element.id !== item.id)
                                            })}>
                                            <FiDelete />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="grubbily-bail">
                            <h4>Subtotal ({state.totalItemsCount} items):</h4>
                            <img src={RupeeIcon} alt="" />
                            <span>{state.totalCost}</span>
                        </div>
                        <div className="suets-pups" onClick={() => navigate("/cart")}>
                            <button>Proceed to Buy</button>
                        </div>
                    </div>
                </div>
                <div className="pagination">
                    <Pagination count={Math.ceil(products.length / 6)} page={page} onChange={(e, value) => setPage(value)} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
