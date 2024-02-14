import { FaCheckCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import MainButton from '../../components/MainButton';
import { LOGIN } from '../CONSTANTS';

export default function SuccessfulConfirmation() {
  const history = useHistory();
  const backToLogin = () => {
    history.push(LOGIN);
  };
  return (
    <div className="login-container colored-border gap-1">
      <FaCheckCircle size="5rem" className="good" />
      <h3 className="ft-30">Email Verified Successfully</h3>
      <span>Let's start the journey!</span>
      <MainButton type="submit" btnLabel="Login" onClick={backToLogin} />
    </div>
  );
}
