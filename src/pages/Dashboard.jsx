import "./css/Dashboard.css"
import { BiSearch,BiChevronDown } from "react-icons/bi"
import { BsCart4 } from "react-icons/bs"
import Logo from "../assets/Logo.jpg"
import RupeeIcon from "../assets/Rupee.png"
import { useEffect, useState } from "react"
import CategoriesPopup from "../components/CategoriesPopup"
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
    const [productsCache, setProductsCache] = useState([])
    const [sort, setSort] = useState("ascending")
    const [page, setPage] = useState(1)
    const [filtered, setFiltered] = useState([])
    const [offset, setOffset] = useState(0)
    const [range, setRange] = useState(6)

    const  { state, actions } = useContext(CartContext)

    const navigate = useNavigate()

    useEffect(() => {
        const init = async () => {
            let uri = category ? `https://fakestoreapi.com/products/category/${category}` : "https://fakestoreapi.com/products"
            
            if (sort === "descending") {
                uri += "?sort=desc"
            }

            const response = await axios.get(uri)

            setPage(1)
            setProducts(response.data)
            setProductsCache(response.data)
        }

        init()
    }, [category, sort])

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
             <div className="navigation">
                <div className="logo-container">
                    <img src={Logo} alt="" />
                    <span>Store</span>
                </div>
                <div className="enfeoff-ion" onClick={() => setPopup(prev => {
                    return prev === "categories" ? false : "categories"
                })}>
                    <span>Categories</span>
                    <BiChevronDown />
                    {popup === "categories" ? <CategoriesPopup setCategory={setCategory} /> : undefined}
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
                <div className="caract-tags">
                    <span className="postburn-aun">Sort By</span>
                    <span 
                        className={sort === "ascending" ? "active" : undefined}
                        onClick={() => setSort("ascending")}
                    >Ascending</span>
                    <span
                        className={sort === "descending" ? "active" : undefined}
                        onClick={() => setSort("descending")}
                    >Descending</span>
                </div>
                <div className="extracts-oven">
                    Showing {offset + 1} – {range > products.length ? products.length : range} of {products.length} results {category ? `for "${category}"` : undefined}
                </div>
                <div className="straiter-seat">
                    <div>
                        {filtered.map((item, index) => {
                            return (
                                <ProductBox key={index} item={item} />
                            )})}
                    </div>
                    <div className={padding(String(state.totalCost))}>
                        <h4>Subtotal ({state.totalItemsCount} items):</h4>
                        <img src={RupeeIcon} alt="" />
                        <span>{state.totalCost}</span>
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
