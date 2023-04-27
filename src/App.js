import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Cart from "./pages/Cart"
import { useState, createContext, useEffect } from "react"

export const CartContext = createContext()

function App() {
	const [cart, setCart] = useState([])
	const [totalItemsCount, setTotalItemsCount] = useState(0)
	const [totalCost, setTotalCost] = useState(0)

	const value = {
        state: { cart, totalItemsCount, totalCost },
        actions: { setCart }
    }

	useEffect(() => {
		let count = 0
		let cost = 0
		cart.forEach(item => {
			count += item.quantity
			cost += item.quantity * item.price
		})
		const formatter = String(cost).split(".")
		setTotalItemsCount(count)
		setTotalCost(formatter[0] + "." + (formatter.length > 1 ? formatter[1].slice(0,2).padEnd(2, "0") : "00"))
	}, [cart])

	return (
		<BrowserRouter>
			<CartContext.Provider value={value}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</CartContext.Provider>
		</BrowserRouter>
	)
}

export default App
