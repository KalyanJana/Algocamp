import getButtonStyling from "./getButtonStyling";

function Button({ text, onClickHandler, styleType = "primary", type="button" }){

    return (
        <button 
            onClick={onClickHandler}
            className={`px-4 py-2 ${getButtonStyling(styleType)} bg-blue-500 text-white`} //1 unite = 4px
            type={type}
        >
            {text}
        </button>
    );
}

export default Button;