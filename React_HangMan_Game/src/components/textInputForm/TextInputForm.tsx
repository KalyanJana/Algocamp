import Button from "../button/Button";
import TextInput from "../TextInput/TextInput";

function TextInputForm({inputType, handleFormSubmit, handleTextInputChange, handleShowHide}){


    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <TextInput 
                    type={inputType}
                    label="Enter a word or a phrase"
                    placeHolder="Enter a word or phrase here ..."
                    onChangeHandler={handleTextInputChange}
                />
            </div>
            <div>
                <Button     
                    styleType="warning"
                    text={inputType === 'password' ? 'Show': 'Hide'}
                    type="button"
                    onClickHandler={handleShowHide}
                />
            </div>
            <div>
                <Button 
                    styleType="primary"
                    text="Submit"
                    type="submit"
                />
            </div>
        </form>
    )
}

export default TextInputForm;