import './ItemCard.css'

export function ItemCard({children}) {
    let {name, price, ingredients, img} = children;
    return (
        <div className="card">
            <h2>{name}</h2>
            {ingredients && ingredients.map((ingredient) => {
                if(ingredients.indexOf(ingredient) === 0) {
                    return <span>{ingredient}</span>
                } else {
                    return <span>, {ingredient}</span>
                }
            })}
            <h3>USD {price}</h3>
        </div>
    )
}