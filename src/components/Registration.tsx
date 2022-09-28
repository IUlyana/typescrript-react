interface RegistrationProps {
  value: string,
  updateText: (str: string) => void,
  handleAction: () => void,
}

const Registration: React.FC<RegistrationProps> = ({ value, updateText, handleAction }) => {
  return (
    <label>
      <input
        placeholder='lisence'
        value={value}
        onChange={(e) => updateText(e.target.value)}
      />
      <button onClick={handleAction}>Регистрация</button>
    </label>
  );
};

export default Registration;