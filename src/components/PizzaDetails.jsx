import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom"
import './PizzaDetails.css'
import { fetchData } from './List'

export function PizzaDetails() {
    const [extrasAdded, setExtrasAdded] = useState([])
    const [extraSelected, setExtraSelected] = useState('');
    const [total, setTotal] = useState(0);
    const [pizzaSelected, setPizzaSelected] = useState({})
    const [allExtras, setAllExtras] = useState([])

    const nameRef = useRef();
    const addressRef = useRef();
    const emailRef  = useRef();

    const { state } = useLocation();
    const params = useParams()

    let {pizza, extras} = state || '';
    // let {name, price, ingredients, img} = pizza || '';

    useEffect(() => {
        if(!state) {
            // get data
            let path = '../../data/data.json';
            fetchData(path).then((data) => {
                console.log('[data]', data)
                let pizzas = data.data.Pizza;
                extras = data.data.Extras;
                console.log('[pizzas]', pizzas)
                for(let pizzaInArray of pizzas) {
                    console.log('[pizzaInArray]', pizzaInArray)
                    if(pizzaInArray.id === parseInt(params.id)) {
                        setPizzaSelected(pizzaInArray)
                        break;
                    }
                }
                setAllExtras(extras)
                setExtraSelected(extras[0].name)
                setTotal(price)
            }).catch((err) => {
                console.log('[err]', err)
            })
        } else {
            setAllExtras(extras)
            setPizzaSelected(pizza);
            setExtraSelected(extras[0].name)
            setTotal(pizza.price)
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
        console.log('[total]', total)
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

    function handleSubmit(e) {
        e.preventDefault()
        console.log('[handleSubmit]', nameRef.current.value, addressRef.current.value, emailRef.current.value)
        alert(`Total Price USD ${total.toFixed(2)}, Ordered ${name} with ${extrasAdded} `)
    }

    // if no state is found, like entered url without navigating, use params
    if(!pizzaSelected.id) {
        return(
            <h1>
                {params.id} Not Found
            </h1>
        )
    } else {
        return(
            <div className="details-container">
                <div className="details">
                    <div className="details-content">
                        <h2>{pizzaSelected.name}</h2>
                        {pizzaSelected.ingredients && pizzaSelected.ingredients.map((ingredient) => {
                            if(pizzaSelected.ingredients.indexOf(ingredient) === 0) {
                                return <span key={ingredient}>{ingredient}</span>
                            } else {
                                return <span key={ingredient}>, {ingredient}</span>
                            }
                        })}
                        <div className="price">
                            <h3>USD {pizzaSelected.price && pizzaSelected.price.toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className="details-image">
                        <img src={`../../data/img/${pizzaSelected.img}`}/>
                    </div>
                </div>
                <div className="order">
                    <div>
                        <h2>Order Now</h2>
                        <b>Please Select Multiple Extras</b>
                        <select onChange={(e) => setExtraSelected(e.target.value)} name="extras">
                            {allExtras && allExtras.map((extra) => {
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
                            <h3>Total Price: USD {total.toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className="order-form">
                        <form onSubmit={handleSubmit}>
                            <input required ref={nameRef} type="text" placeholder="Name"/>
                            <textarea required ref ={addressRef} placeholder="Address"/>
                            <input required ref={emailRef} type="text" placeholder="Email"/>
                            <button className="order-button">Order</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}