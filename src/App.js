import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './Redux/configureStore';

const store = configureStore();


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ backgroundImage: 'url(./assets/images/employeeCard.jpg)' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', minheight: '2000px' }}>
            <Main />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
