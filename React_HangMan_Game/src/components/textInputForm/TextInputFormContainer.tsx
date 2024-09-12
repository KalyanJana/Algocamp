import { useNavigate } from "react-router-dom";
import TextInputForm from "./TextInputForm";
import {useState} from 'react'

function TextInputFormContainer(){

    const [inputType, setInputType] = useState('password')
    const [value, setValue] = useState("")

    const navigate = useNavigate()

    function handleFormSubmit(e){
        e.preventDefault()
        if(value){
            navigate("/play", { state: { wordSelected: value }}) 
        }
        console.log("Submitted value", value)
    }
    function handleTextInputChange(e){
        console.log(e.target.value)
        setValue(e.target.value)
    }

    function handleShowHide(e){
        console.log(e.target.value)
        if(inputType === 'password'){
            setInputType('text')
        }else{
            setInputType('password')
        }

    }

    return(
        <TextInputForm 
            inputType ={inputType}
            handleFormSubmit = {handleFormSubmit}
            handleTextInputChange = {handleTextInputChange}
            handleShowHide={handleShowHide}
        />
    )
}

export default TextInputFormContainer