

function Button({text, type="button", styleType='primary', onClickHandler }){

    return (
        <button
            onClick={onClickHandler}
            className={`px-4 py-2 ${getButtonStyline(styleType)} bg-blue-500 text-white`}
        >
            {text}
        </button>
    )
}

function getButtonStyline(styleType){
    if(styleType === 'primary'){
        return 'bg-blue-500'
    }else if( styleType === 'secondary'){
        return 'bg-gray-500'
    }else if(styleType === 'warning'){
        return 'bg-yellow-500'
    }else if(styleType === 'success'){
        return 'bg-blue-500'
    }else{
        return 'bg-red-500'
    }
}

export default Button