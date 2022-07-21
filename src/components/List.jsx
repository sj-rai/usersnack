import React, { useEffect, useState } from "react"
import { ItemCard } from "./ItemCard"

export function List() {
    const [pizzaList, setPizzaList] = useState([])

    useEffect(() => {
        fetchData().then((data) => {
            console.log('[data]', data)
            setPizzaList(data.data.Pizza)
        }).catch((err) => {
            console.log('[err]', err)
        })
    }, [])

    return (
        <ul>
        {pizzaList && pizzaList.map((item, key) => {
            return (<li key={key}>
                        <ItemCard>{item}</ItemCard>
                    </li>)
            })}
        </ul>
    )
}

function fetchData() {
    return new Promise((resolve, reject) => {
        return fetch('data/data.json').then((response) => {
            console.log('[response]', response)
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((data) => {
            console.log("[data]", data)
            resolve({data: data})
        }).catch(err => {
            reject(err);
        });
    })
}