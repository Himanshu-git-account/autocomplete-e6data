import './App.css';
import Search from './Search';
import { data } from './data';

function App() {
  return (
    <div>
        <Search data={data} ></Search>
    </div>
  );
}

export default App;
