import React, {Component} from 'react';
import './App.css';


class App extends Component {
  state = {
    plans: []
  }

  componentDidMount() {
    console.log("hi");
    fetch('http://localhost:5000/plans/5e51e1d605519a4e80b19c3f')
      .then(res => res.json())
      .then((data) =>{
        this.setState({plans: data})
        console.log(this.state.plans);
        console.log(data);
      })
      .catch(console.log)
      
  }
  render() {
    return (
      <div className = "container">
        <p>{this.state.plans.deductible} {this.state.plans.outOfPocket} {this.state.plans.premium} {this.state.plans.premium}
        </p>
      
          <p>You can{this.state.plans.canKeepDoctor ? '':"'t"} keep your doctor!</p>
        
      </div>
    );
  }
}

export default App;
