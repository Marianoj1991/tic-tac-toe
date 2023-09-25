import "../App.css";
import ResetButton from "./Button";

const ModalWindow = ({winner, handleResetBoard}) => {

    const textWindow = (!winner) ? 'Hay un empate' : `El ganador es ${winner}` 

  return (
    <article className="modalWindow">
      <div className="modalBox">
        <h1>{ textWindow }</h1>
        <ResetButton handleResetBoard={handleResetBoard} />
      </div>
    </article>
  );
};

export default ModalWindow;
