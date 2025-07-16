import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SearchPage from "./components/MainPage";

const App: React.FC = () =>{
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SearchPage/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;