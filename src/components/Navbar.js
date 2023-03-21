import "../assets/styles/Navbar.css"

const Navbar = (props) => {
    return (
        <div className="Navbar">
            <div className="Navbar-Title">
                <h1>Memory Game</h1>
            </div>
            <div className="Navbar-Message">
                <div className="Message">
                    <p>{props.message}</p>
                </div>
            </div>
            <div className="Navbar-Count">
                <div>
                    <p>Count: {props.count}</p>
                    <p>Best Score: {props.bestScore}</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar