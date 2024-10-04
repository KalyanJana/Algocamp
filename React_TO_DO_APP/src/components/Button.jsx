import { memo } from "react";

function Button({ text, onClickHandler, className }) {
  return (
    <button className={className} onClick={onClickHandler}>
      {text}
    </button>
  );
}

export default memo(Button);
