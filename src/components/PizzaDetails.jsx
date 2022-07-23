import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"
import './PizzaDetails.css'

export function PizzaDetails() {
    const [extrasAdded, setExtrasAdded] = useState([])
    const [extraSelected, setExtraSelected] = useState('');
    const [total, setTotal] = useState(0);

    const { state } = useLocation();
    const params = useParams()

    const {pizza, extras} = state;
    const {name, price, ingredients, img} = pizza;

    useEffect(() => {
        if(!state) {
            // get data
        } else {
            setExtraSelected(extras[0].name)
            setTotal(price)
        }
    }, [])
    

    function addExtra() {
        let newList;
        if(extrasAdded.indexOf(extraSelected) === -1) {
            newList = [...extrasAdded, extraSelected];
            calculateTotal(extraSelected, 'add')
        } else {
            newList = extrasAdded;
        }
        setExtrasAdded(newList)
    }

    function calculateTotal(newExtra, action) {
        console.log('[newExtra]', newExtra)
        extras.forEach((extra) => {
            if(extra.name === newExtra) {
                if(action === 'add') {
                    setTotal(total+extra.price)
                } else if(action === 'remove') {
                    setTotal(total-extra.price)
                }
            }
        })
    }

    function deleteTag(item) {
        console.log('[deleteTag]')
        let newList = [...extrasAdded];
        if(newList.indexOf(item) > -1) {
            console.log('[newList.indexOf(item)]', newList.indexOf(item))
            newList.splice(newList.indexOf(item), 1)
            console.log('[newList]', newList)
            calculateTotal(item, 'remove')
        }
        setExtrasAdded(newList)
    }

    // if no state is found, like entered url without navigating, use params
    if(!state) {
        return(
            <h1>
                {params.id} Not Found
            </h1>
        )
    } else {
        // const {pizza, extras} = state;
        console.log('[extras]', extras)
        // const {name, price, ingredients, img} = pizza;
        return(
            <div className="details-container">
                <div className="details">
                    <div className="details-content">
                        <h2>{name}</h2>
                        {ingredients && ingredients.map((ingredient) => {
                            if(ingredients.indexOf(ingredient) === 0) {
                                return <span key={ingredient}>{ingredient}</span>
                            } else {
                                return <span key={ingredient}>, {ingredient}</span>
                            }
                        })}
                        <div className="price">
                            <h3>USD {price}</h3>
                        </div>
                    </div>
                    <div className="details-image">
                        <img src={`../../data/img/${img}`}/>
                    </div>
                </div>
                <div className="order">
                    <div>
                        <h2>Order Now</h2>
                        <b>Please Select Multiple Extras</b>
                        <select onChange={(e) => setExtraSelected(e.target.value)} name="extras">
                            {extras.map((extra) => {
                                return (<option key={extra.name} value={extra.name}>{extra.name} (+ USD {extra.price})</option>)
                            })}
                        </select>
                        <button onClick={() => addExtra()}>add</button>
                        <div className="extras">
                            {extrasAdded.map((extraAdded) => {
                                console.log('[extraAdded]', extraAdded)
                                return (
                                <div key={extraAdded} className="extras-tag">
                                    {extraAdded}
                                    <button className="delete-tag" onClick={() => deleteTag(extraAdded)}>x</button>
                                </div>
                                )
                            })}
                        </div>
                        <div>
                            <h3>Total Price: {total}</h3>
                        </div>
                    </div>
                    <div className="order-form">
                        <form onSubmit={(e) => {e.preventDefault; alert('ordered');}}>
                            <input type="text" placeholder="Name"/>
                            <textarea placeholder="Address"/>
                            <input type="text" placeholder="Email"/>
                            <button className="order-button">Order</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}