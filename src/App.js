import React, {Component} from 'react';
import './App.css';
import Visualization from './Components/Visualization';
import AnswerBox from './Components/AnswerBox';
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
  constructor(props){
    super(props);
    this.state = {
      data: [],
      graphData: [],
      hasCompleted: false,
      toDisplay: "HDHP+Premier",
      currentStage: 0,
      hasFinishedForms: false
    };
    this.markComplete = this.markComplete.bind(this);
  }
  



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
  
  markComplete(){
    this.setState({hasFinishedForms: true});
  }
  
  render() {
    if(!this.state.hasCompleted && this.state.currentStage === 5){
      return null;
    }
    const forms = {
      height:"100%",
      marginBottom: 0
    }

    let stages = [<p style={forms}>poop</p>,<p style={forms}>fart</p>, <p>ass</p>,<p>peepee</p>,<p>poopoo</p>]
    return(
      <div class="center-block" style={{marginTop:10, marginLeft:50, width:"90%",}}>
        {!this.state.hasFinishedForms ? <AnswerBox hasFinishedForms={this.markComplete}/> :''}
        {this.state.hasFinishedForms ? 
          <div style={{height:"80vh"}}>
            <Visualization graphData={this.state.graphData} data={this.state.data}/>
          </div>:''
        }
        

      </div>
    );
  }
}

export default App;
