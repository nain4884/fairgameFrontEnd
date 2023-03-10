import './App.css';
import Main from './main';
import { ThemeProvider } from '@mui/system';
import theme from './theme';
import { Provider } from 'react-redux'
import store from './store';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Main />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;