import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import SigninPage from "./pages/signin";
import Support from './pages/support';
import Market from './pages/market';
function App() {
  return (
    // <Router>
    //   <Switch>
    //     <Route path="/" component={Home} exact />
    //     <Route path="/signin" component={SigninPage} exact />
    //     <Route path="/support" component={Support} exact /> 
    //     <Route path="/market" component={Market} exact/>
    //   </Switch>
    // </Router>

    // <Routes>

    //   <Route path="/" element={<Home />} />
    //   <Route path="/signin" element={<SigninPage />} exact />
    //   <Route path="/support" element={<Support />} />
    //   <Route path="/market" element={<Market />} />


    // </Routes>
     <Router>

       <Routes>
         <Route exact path="/" element={<Home/>}/>
         <Route path="/signin" element={<SigninPage/>}/>
         <Route path="/support" element={<Support/>}/>
         <Route path="/market"  element={<Market/>}/>
       </Routes>

   </Router>

  );
}

export default App;
