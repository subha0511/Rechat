import Signup from "../components/Signup"
import Signin from "../components/Signin"
import { BrowserRouter as Router,Switch , Route } from "react-router-dom"
const Loginsignup = ()=>{
    return (
    <Router>
        <Switch>
        <Route path="/" exact component={Signin}/>
        <Route path="/signup" exact component={Signup}/>
        </Switch>
    </Router>)
}
export default Loginsignup