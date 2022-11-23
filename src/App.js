import {HashRouter as Router, Routes,Route} from "react-router-dom"
import CoinDetails from "./componets/CoinDetails";
import Coins from "./componets/Coins";
import Exchanges from "./componets/Exchanges";
import Footer from "./componets/Footer";
import Header from "./componets/Header";
import Home from "./componets/Home";
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/exchanges" element={<Exchanges/>}/>
        <Route path="/coin/:id" element={<CoinDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
   
  );
}

export default App;
