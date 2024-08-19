import './App.css';
import RoutesApp from './routes';
import { RecoilRoot } from 'recoil';
import AuthProvider from "./context/auth";

function App() {

  return (
    <>
    <RecoilRoot>
      <AuthProvider>
        <RoutesApp/>
      </AuthProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
