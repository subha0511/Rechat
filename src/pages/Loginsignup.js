import Signup from "../components/Signup"
import Signin from "../components/Signin"
import Chat from "../pages/chat"
import { BrowserRouter as Router,Switch , Route } from "react-router-dom"
const Loginsignup = ()=>{
    
    return (
    <Router>
        <Switch>
        <Route path="/" exact component={Signin}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/chat" exact component={Chat}/>
        
        </Switch>
    </Router>)
}
export default Loginsignup