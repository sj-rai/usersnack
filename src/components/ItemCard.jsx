import './ItemCard.css'

export function ItemCard({children}) {
    let {name, price, ingredients, img} = children;
    return (
        <div className="card">
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
                <img src={`data/img/${img}`}/>
            </div>
        </div>
    )
}