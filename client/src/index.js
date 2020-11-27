import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import AddState from './AddState';

const Nav =() =>(
    <div>
        <ul>
            <li><Link to="/">Add a new Shipment</Link></li>
            <li><Link to="/viewShipment">View Shipment Details</Link></li>
        </ul>
    </div>
);

class App1 extends Component{
    constructor(){
        super();
        this.state={
            name:'React'
        };
    }
    render(){
        return (
            <Router>
                <div>
                    <Nav/>
                    <Route exact path="/" component={App}/>
                    <Route path="/viewShipment" component={AddState} />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App1 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
