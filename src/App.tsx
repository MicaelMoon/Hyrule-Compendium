import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Fruits from "./components/Fruits";
import Search from "./components/MainPage";

const App: React.FC = () =>{
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Search/>}></Route>
          <Route path="/fruits" element={<Fruits/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;