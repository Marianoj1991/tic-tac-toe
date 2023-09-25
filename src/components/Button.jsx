
const ResetButton = ({ handleResetBoard }) => {
    return (
      <button onClick={handleResetBoard} className="button-reset">
        Reset the game
      </button>
    );
  };

  export default ResetButton