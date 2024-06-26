import { Category } from "../../types"
import { useStateValue } from "../context/StateProvider"

export const FilterFood = (category:string) => {
    const [{foodItems}, dispatch] = useStateValue()
    return foodItems?.filter((item: Category) => item.nombre.toLowerCase() === category.toLowerCase())
}   

export const GetFoodById = (id: number) => {
    const [{foodItems}, dispatch] = useStateValue()
    return foodItems?.find((item:Category) => item.id === id)
}