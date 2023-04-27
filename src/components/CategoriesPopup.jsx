import axios from "axios"
import "./css/CategoriesPopup.css"
import { useEffect, useState } from "react"

const CategoriesPopup = ({ setCategory }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const init = async () => {
            const response = await axios.get("https://fakestoreapi.com/products/categories")

            setCategories(response.data)
        }

        init()
    }, [])

    return (
        <div className="_0zyv">
            <ul className="breezy-nag">
                <li onClick={() => setCategory(undefined)}>All</li>
                {categories.map((item, index) => {
                    return <li key={index} onClick={() => setCategory(item)}>
                        {item[0].toUpperCase()}{item.slice(1,)}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default CategoriesPopup
