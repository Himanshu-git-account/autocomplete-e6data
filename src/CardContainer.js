import React from 'react'
import CardItem from './CardItem'

const CardContainer = ({card}) => {
    return <div className='card-container row'>
    {card.map((item)=> <CardItem item={item}/>
    )}
    </div>
  
}

export default CardContainer