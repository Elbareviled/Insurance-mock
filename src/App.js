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
    toDisplay: ""
  };

  componentDidMount() {
    //console.log("hi");
    fetch('http://localhost:5000/plans/')
      .then(res => res.json())
      .then((data) =>{
        this.setState({data: data})
        console.log(data);
        this.setState({graphData: getGraphData(data)})
        console.log(this.state.graphData);
        this.setState({hasCompleted: true})
        //console.log(this.state);
        //console.log(data);
      })
      .catch(console.log)
      
  }
  updatePlan(str){
    this.setState({toDisplay: str})
  }
  searchForPlanById(str){
    if(!this.state.hasCompleted){return null};
    for(let i = 0; i<this.state.data.length; i++){
      if(this.state.data[i].planName === str){
        return this.state.data[i];
      }
    }
    return [];
  }
  
  render() {
    if(!this.state.hasCompleted){ return(null); }
    let info =<p></p>;
    if(this.state.toDisplay === "HDHP+Premier") {
      let plan = this.searchForPlanById(this.state.toDisplay, this.data);
      console.log(plan);
      info=<p>{plan.coveredBeforeDed}</p>
    }
    if(this.state.toDisplay === "HDHP+Standard") {
      let plan = this.searchForPlanById(this.state.toDisplay, this.data);
      info=<p>{plan.coveredBeforeDed[0]}</p>
    }
    if(this.state.toDisplay === "PPO+Premier") {
      let plan = this.searchForPlanById(this.state.toDisplay, this.data);
      info=<p>{plan.coveredBeforeDed[0]}</p>
    }
    if(this.state.toDisplay === "PPO+Standard") {
      let plan = this.searchForPlanById(this.state.toDisplay, this.data);
      info=<p>{plan.coveredBeforeDed[0]}</p>
    }
    return (
      <div>
        <div style={{height:600}}>
          <Bar data={this.state.graphData} updatePlan={(value)=> this.updatePlan(value)}/>
        </div>
        <div style={{height:300}}>
          {info}
        </div>
      </div>
    );
  }
}

export default App;
