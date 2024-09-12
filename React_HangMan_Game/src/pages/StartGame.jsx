import { Link, Navigate } from "react-router-dom";
import TextInputFormContainer from "../components/textInputForm/TextInputFormContainer";
import Button from "../components/button/Button";
import { useState } from "react";

function StartGame(){
    const [showTextForm, setShowTextForm] = useState(false)

    function clickHanlder(){
        setShowTextForm(prev=>!prev)
    }
    return (
        <>
            <h1>Hang Man Game</h1>

            {  showTextForm && <TextInputFormContainer />}

            {!showTextForm && <Button text={"Start Game"} onClickHandler={clickHanlder} />}
        </>
    )
}

export default StartGame;