import { useNavigate } from 'react-router-dom';
import './ItemCard.css'


export function ItemCard({children}) {
    let {name, price, ingredients, img} = children;
    const navigate = useNavigate();

    function showDetails(pizza) {
        console.log('[details]', pizza)
        navigate(`/pizzas/${pizza.id}`, {state: pizza});
    }

    return (
        <div className="card" onClick={() => showDetails(children)}>
            <div className="card-details">
                <h2>{name}</h2>
                {ingredients && ingredients.map((ingredient) => {
                    if(ingredients.indexOf(ingredient) === 0) {
                        return <span>{ingredient}</span>
                    } else {
                        return <span>, {ingredient}</span>
                    }
                })}
                <div className="card-price">
                    <h3>USD {price}</h3>
                </div>
            </div>
            <div className="card-image">
                <img src={`data/img/${img}`}/>
            </div>
        </div>
    )
}