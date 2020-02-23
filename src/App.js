import React, {Component} from 'react';
import './App.css';
import Bar from './Components/Bar';
import {  } from "module";

const getGraphData = (body) =>{
  //console.log(body);
  let premium = {
    "expense": "Premium",
  }
  let deductible = {
    "expense": "Deductible"
  }
  let maxOutPocket = {
    "expense": "Max Out of Pocket"
  }
  body.forEach(element => {
    premium[element.planName] = element.premium;
    deductible[element.planName] = element.deductible;
    maxOutPocket[element.planName] = element.maxOutPocket;
  });
  return([premium, deductible, maxOutPocket]);


}

class App extends Component {
  state = {
    data: [],
    graphData: [],
    hasCompleted: false,
    shit: [1,2,3,4]
  };

  componentDidMount() {
    //console.log("hi");
    fetch('http://localhost:5000/plans/')
      .then(res => res.json())
      .then((data) =>{
        this.setState({plans: data})
        this.setState({graphData: getGraphData(data)})
        console.log(this.state.graphData);
        this.setState({hasCompleted: true})
        //console.log(this.state);
        //console.log(data);
      })
      .catch(console.log)
      
  }
  
  
  render() {
    if(!this.state.hasCompleted){ return(null); }
    return (
      <div>
        <div style={{height:600}}>
          <Bar data={this.state.graphData}/>
        </div>
      </div>
    );
  }
}

export default App;
