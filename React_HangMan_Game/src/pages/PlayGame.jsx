import { Link, useLocation} from "react-router-dom";
import MaskedText from "../components/MaskedText/MaskedText";
import LetterButtons from "../components/LetterButtons/LetterButtons";
import { useEffect, useState } from "react";
import HangMan from "../components/HangMan/HangMan";
import GameModal from "./GameModal";
import { getMaskedString } from "../components/MaskedText/MaskingUtility";

function PalyGame(){

    const {state} = useLocation() 
    const [guessedLetters, setGussedLetters] = useState([])
    const [step, setStep] = useState(0)
    const [isGameOver, setIsGameOVer] = useState(false)

    function isWordGussed(){
        const finalArray = getMaskedString(state.wordSelected, guessedLetters)
        console.log("fianlArray", finalArray.join(''))
        if(state.wordSelected === finalArray.join("")){
            return true
        }
    }
    useEffect(()=>{
        if(isWordGussed() || step > 6 ){
            setIsGameOVer(true)
            return
        }
    }, [guessedLetters, step])

    console.log("guessedLetters", guessedLetters)

    function handleLetterClick(letter){
       
        if(state.wordSelected.toUpperCase().includes(letter)){
            console.log('correct')
           
        }else{
            console.log('wrong')
            console.log('step', step)
            setStep(step=> step + 1)
            
        }
        setGussedLetters([...guessedLetters, letter])
    }

    function handleRestart() {
        // Reset game state
        setGussedLetters([]);
        setStep(0);
        setIsGameOVer(false);
    }

    return(
        <>
            <h2>Play game</h2>

            <MaskedText 
                text={state.wordSelected} 
                guessedLetters={guessedLetters}
            />

           <div>
           <LetterButtons 
                text={state.wordSelected} 
                guessedLetters={guessedLetters} 
                onLetterClick={handleLetterClick}
                disableAllBtn={isGameOver}
            />
           </div>

           <div>
                <HangMan step={step}/>
           </div>

            <Link to={"/start"} className="text-blue-700">Start Game Link</Link>

            {isGameOver && <GameModal onRestart={handleRestart} />}
        </>
    )
}

export default PalyGame;