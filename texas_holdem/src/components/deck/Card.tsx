type CardProps = {
    value: string,
    suit: string
}


const Card = ({value, suit}: CardProps) =>{
    return(
        <div>
            <h1>{`${value} of ${suit}`}</h1>
        </div>
    )
}

export default Card;