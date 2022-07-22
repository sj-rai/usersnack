import { useParams, useLocation } from "react-router-dom"
import './PizzaDetails.css'

export function PizzaDetails() {
    const { state } = useLocation();
    const params = useParams()

    // if no state is found, like entered url without navigating, use params
    if(!state) {
        return(
            <h1>
                {params.id} Not Found
            </h1>
        )
    } else {
        const {name, price, ingredients, img} = state;
        return(
            <div className="details-container">
                <div className="details">
                    <h2>{name}</h2>
                    {ingredients && ingredients.map((ingredient) => {
                        if(ingredients.indexOf(ingredient) === 0) {
                            return <span>{ingredient}</span>
                        } else {
                            return <span>, {ingredient}</span>
                        }
                    })}
                    <div className="price">
                        <h3>USD {price}</h3>
                    </div>
                </div>
                <div className="image">
                    <img src={`../../data/img/${img}`}/>
                </div>
            </div>
        )
    }
}