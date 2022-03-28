import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundImage: 'url(./assets/images/employeeCard.jpg)' }}>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', minheight: '2000px' }}>
          <Main />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
