import './App.css';
import Main from './main';
import { ThemeProvider } from '@mui/system';
import theme from './theme';
import { Provider } from 'react-redux'
import store from './store';
import { SocketProvider } from './context/socketContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      <SocketProvider>
        <div className="App">
          <Main />
        </div>
        </SocketProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;