import HolbertonLogo from './HolbertonLogo.jpg';
import './App.css'
import { getFullYear, getFooterCopy } from './utils';
import Notifications from './Notifications';

function App() {
  return (
    <div className='App'>
      <div className='root-notifications'>{Notifications()}</div>
      <div className='App-header'>
        <img className='App-logo' src={HolbertonLogo} alt='logo'></img>
        <h1>School dashboard</h1>
      </div>
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
        <label className='email'>
          Email:
        </label>
        <input type='email'/>
        <label className='password'>
          Password: 
        </label>
        <input type='password'/>
        <button className='label-button'>OK</button>
      </div>
      <div className='App-footer'>
        <p>
          {getFullYear()} {getFooterCopy()}
        </p>
      </div>
    </div>
  );
}

export default App;
