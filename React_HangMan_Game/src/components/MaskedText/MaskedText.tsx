import { getMaskedString } from "./MaskingUtility";


function MaskedText({text, guessedLetters}){

    const maskedString = getMaskedString(text, guessedLetters)

    return(
        <>
            {maskedString.map((letter, index)=>{
                return(
                    <span className="mx-1" key={index}>{letter}</span>
                )
            })}
        </>
    )
}

export default MaskedText