import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExtrasContext } from './List';
import './ItemCard.css'


export function ItemCard({children}) {
    let {name, price, ingredients, img} = children;
    let extras = useContext(ExtrasContext)
    console.log('[extras]', extras)
    const navigate = useNavigate();

    function showDetails(pizza) {
        console.log('[details]', pizza)
        navigate(`/pizzas/${pizza.id}`, {state: {pizza: pizza, extras: extras}});
    }

    return (
        <div className="card" onClick={() => showDetails(children)}>
            <div className="card-details">
                <h2>{name}</h2>
                {ingredients && ingredients.map((ingredient) => {
                    if(ingredients.indexOf(ingredient) === 0) {
                        return <span key={ingredient}>{ingredient}</span>
                    } else {
                        return <span key={ingredient}>, {ingredient}</span>
                    }
                })}
                <div className="card-price">
                    <h3>USD {price.toFixed(2)}</h3>
                </div>
            </div>
            <div className="card-image">
                <img src={`data/img/${img}`}/>
            </div>
        </div>
    )
}