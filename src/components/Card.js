import "../assets/styles/Card.css"

const Card = (props) => {
    return (
        <div className="Card" onClick={props.click}>
            <img src={props.image.src} alt={props.image.name} id={props.image.key}></img>
            <p>{props.image.name}</p>
        </div>
    )
}

export default Card