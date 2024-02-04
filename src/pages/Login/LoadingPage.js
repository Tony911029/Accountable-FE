import { PacmanLoader } from 'react-spinners';

export default function LoadingPage() {
  return (
    <PacmanLoader
      color="#FF9900"
      size="5rem"
      style={{
        position: 'fixed',
        top: '30%',
        left: '45%',
      }}
    />
  );
}
