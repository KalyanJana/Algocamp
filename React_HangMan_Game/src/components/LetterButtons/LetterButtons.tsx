const ALPHABETS = "QWERTYUIOPASDFGHJKLZXCVBNM".split('');

function LetterButtons({text, guessedLetters, onLetterClick, disableAllBtn}){

    const originalLetters = new Set(text.toUpperCase().split(''))
    const guessedLettersSet = new Set(guessedLetters);

    const buttonStyle = function(letter){
        if(guessedLettersSet.has(letter)){
            return `${originalLetters.has(letter) ? 'bg-green-500' : 'bg-red-500'}`
        }else{
            return 'bg-blue-500'
        }
    }

    function handleLetterCLick(event){
        const characterOfTheLetter = event.target.value
        onLetterClick?.(characterOfTheLetter)
    }

    const buttons = ALPHABETS.map(letter=>{
        return(
            <button 
                key={`button-${letter}`}
                value={letter}
                onClick={handleLetterCLick}
                disabled={guessedLettersSet.has(letter) || disableAllBtn}
                className={`h-12 w-12 m-1 text-white rounded-md ${buttonStyle(letter)}`}
            >
                {letter}
            </button>
        )
    })

    return (
        <>
            {buttons}
        </>
    )

}
export default LetterButtons;