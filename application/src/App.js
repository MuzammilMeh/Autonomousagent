import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import SigninPage from "./pages/signin";
// import Support from './pages/support';
import Market from './components/services/support copy';
import QueryResponse from "./components/services/support"
import Ai_Agent from "./components/services/support copy 2"
function App() {
  return (

     <Router>

       <Routes>
         <Route exact path="/" element={<Home/>}/>
         <Route path="/signin" element={<SigninPage/>}/>
         {/* <Route path="/support" element={<Support/>}/> */}
         {/* <Route path="/market"  element={<Market/>}/> */}
         <Route path="query-response" element={<QueryResponse/>} />
         <Route path="/market" element={<Market/>} />
         <Route path="/ai_agent" element={<Ai_Agent/>} />

       </Routes>

   </Router>

  );
}

export default App;
