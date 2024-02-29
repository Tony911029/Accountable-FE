import { AppLayout } from 'src/components/AppLayout/AppLayout';
import LoginBlock from './LoginBlock';
import './Login.css';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth } from 'src/navigation/Auth/ProvideAuth';
import LoadingPage from 'src/pages/LoginSignUp/LoadingPage';
import Footer from '../../components/AppLayout/Footer';

export default function LoginPageContainer() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (user) {
    return <Redirect to={from} />;
  }

  return (
    !isLoading
      ? (
        <AppLayout>
          <div className="login-container">
            <LoginBlock />
          </div>
          <Footer />
        </AppLayout>
      )
      : <LoadingPage />
  );
}
