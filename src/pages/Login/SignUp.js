import { signUp } from 'src/navigation/Auth/UserPool';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import './Login.css';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { BsCheck2 } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import {
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { AppLayout } from 'src/components/AppLayout/AppLayout';
import { useState } from 'react';
import { useAuth } from 'src/navigation/Auth/ProvideAuth';
import { passWordCondData } from './PassWordCondData';
import ConfirmSignUp from './ConfirmSignUp';
import MainButton from '../../components/MainButton';
import Footer from '../../components/AppLayout/Footer';

function CheckIcon() {
  return <BsCheck2 />;
}

function ClearIcon() {
  return <RxCross2 />;
}

function RoleCard({ name, selectedRole, setSelectedRole }) {
  return (
    <div
      className={`roleTab ${selectedRole === name ? 'roleTab-selected' : ''}`}
      onClick={() => setSelectedRole(name)}
    >
      {name}
    </div>
  );
}

const roles = { STUDENT: 'STUDENT', TEACHER: 'TEACHER' };
function SignUp() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();
  const [requirements, setRequirements] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitErr, setSubmitErr] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const passwordValue = watch('password', '');
  const username = watch('userName', '');
  const [isLoading, setIsLoading] = useState(false);
  const { role, setRole } = useAuth();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const verifyInput = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    setRequirements([
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      hasMinLength,
    ]);
  };
  const isValidConfirmPassword = (value) => {
    if (value !== passwordValue) {
      return "* The passwords don't match";
    }
    return true;
  };
  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? true : '* Email is invalid';
  };
  const onSubmit = async (userData) => {
    setIsLoading(true);
    setIsSignUp(false);
    const {
      userName, email, password, confirmPassword,
    } = userData;
    try {
      await signUp(userName, email, password);
      setIsLoading(false);
      setIsSignUp(true);
    } catch (err) {
      setSubmitErr('The User name or email is already taken!');
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <AppLayout>
      {
        isSignUp ? <ConfirmSignUp username={username} /> : (
          <div className="login-container">
            <div className="colored-border">
              <h1>Register</h1>
              <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="userName"
                  control={control}
                  defaultValue=""
                  rules={{ required: '* User name is required' }}
                  render={({ field }) => (
                    <TextField
                      label="User name"
                      type="text"
                      {...field}
                      error={!!errors.userName}
                      helperText={errors.userName?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: '* Email is required',
                    validate: isValidEmail,
                  }}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      type="text"
                      {...field}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: '* Password is required' }}
                  render={({ field }) => (
                    <TextField
                      label="Password"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((show) => !show)}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...field}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      onChange={(e) => {
                        field.onChange(e); // This is handled by React Hook Form
                        verifyInput(e.target.value); // Pass the current input value to your verifyInput function
                      }}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: '* Confirm password is required',
                    validate: isValidConfirmPassword,
                  }}
                  render={({ field }) => (
                    <TextField
                      label="Confirm password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...field}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowConfirmPassword((show) => !show)}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                    />
                  )}
                />
                <div>
                  <List>
                    {
                        passWordCondData.map((item, index) => {
                          const isGood = requirements[index] ? 'good' : 'bad';
                          return (
                            <ListItem className={isGood} key={index}>
                              <ListItemIcon className={isGood}>{requirements[index] ? <CheckIcon /> : <ClearIcon />}</ListItemIcon>
                              <ListItemText primary={item.description} className={isGood} />
                            </ListItem>
                          );
                        })
                    }
                  </List>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>Register as:</div>
                {/* ,use map for the future */}
                <div className="flex role-select-container mb-1">
                  <RoleCard
                    name={roles.STUDENT}
                    setSelectedRole={setRole}
                    selectedRole={role}
                  />
                  <RoleCard
                    name={roles.TEACHER}
                    setSelectedRole={setRole}
                    selectedRole={role}
                  />
                </div>
                <FormControlLabel
                  className="consent-checkbox mb-1"
                  required
                  variant="label-hidden"
                  control={<Checkbox style={{ color: '#FF9900' }} />}
                  label="By clicking this checkbox, I agree to consent to Accountable using my personal data to improve the platform."
                />
                <MainButton type="submit" btnLabel="Register" isLoading={isLoading} className="login-button" />
                {submitErr ? <div className="bad">{submitErr}</div> : <></>}
              </form>
            </div>
          </div>
        )
      }
      <Footer />
    </AppLayout>
  );
}

export default SignUp;
