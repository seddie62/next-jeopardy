import "./button.css";

const FunkyButton = ({ children, color = '#39FF14', onClick }) => {
    return (
        <button onClick={onClick} className="funky-btn" style={{ ['--clr']: color }} ><span>{children}</span><i></i></button>
    );
}

export default FunkyButton;