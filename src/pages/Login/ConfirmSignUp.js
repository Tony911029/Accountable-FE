import { useState } from 'react';
import { confirmSignUp } from 'src/navigation/Auth/UserPool';
import ReactCodeInput from 'react-code-input';
import { MdEmail } from 'react-icons/md';
import { useAuth } from 'src/navigation/Auth/ProvideAuth';
import { createNewUser } from 'src/services/userServices';
import MainButton from '../../components/MainButton';
import SuccessfulConfirmation from '../../navigation/Auth/SuccessfulConfirmation';

// TODO: Figure out how to resend a code,
// TODO: what should happen if the user leaves the page before entering the code
export default function ConfirmSignUp() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { username } = useAuth();

  const inputProps = {
    inputStyle: {
      fontFamily: '\'Poppins, sans-serif\'',
      MozAppearance: 'textfield',
      margin: '4px',
      width: '3rem',
      fontSize: '30px',
      height: '3rem',
      paddingLeft: '7px',
      color: '#000',
      border: '1px solid #ff9900',
    },
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const createUserPayload = (awsUser) => {
    const userPayload = {};
    userPayload.userId = awsUser.sub;
    userPayload.email = awsUser.email;
    userPayload.usernmae = awsUser.usernmae;
    return userPayload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await confirmSignUp(username, code)
        .then(async (awsUser) => {
          await createNewUser(createUserPayload(awsUser));
          setSuccess(true);
        }).catch((err) => setError('something is wrong when creating user'));
    } catch (err) {
      setError('This code is incorrect');
    }
  };

  if (success) {
    return (
      <SuccessfulConfirmation />
    );
  }

  return (
    <div>
      <div className="login-container colored-border">
        <MdEmail size="5rem" color="#FF9900" />
        <h3 className="ft-30">Verify Your Email</h3>
        <span>We have sent a verification code to your email, please enter the code below.</span>
        <form onSubmit={handleSubmit} className="login-form">
          <ReactCodeInput
            id="number"
            type="number"
            fields={6}
            onChange={handleCodeChange}
            {...inputProps}
          />
          <MainButton type="submit" btnLabel="Verify" />
        </form>
        {error ? <div className="bad">* input code is incorrect</div> : <></>}
      </div>
    </div>
  );
}
