import React, { Component } from 'react';
import yes from '../icons8-checkmark.svg'
import Bar from './Bar';
class Visualization extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            toDisplay: "HDHP+Premier",
            hasCompleted: false
        };
        console.log("i'm in vizualization");
        
    }

    componentDidMount(){
        this.setState({hasCompleted:true})
    }

    updatePlan(str){
        this.setState({toDisplay: str})
      }

    searchForPlanById(str){
        if(!this.state.hasCompleted){return null};
            for(let i = 0; i<this.props.data.length; i++){
                if(this.props.data[i].planName === str){
                return this.props.data[i];
                }
            }
        return [];
        }

    render(){

        console.log(this.props);
        if(!this.state.hasCompleted){ return null; }
        let plan = this.searchForPlanById(this.state.toDisplay, this.props.data);
        let info=<p class="indent">{plan.coveredBeforeDed.join(", ")}.</p>
        let yes_no;
        if(!plan.needRefferal){
        yes_no = <img src={yes} alt="yes check" style={{height: 18, marginLeft:5, marginBottom:-2}}/>
        }
        else{
        yes_no =null;
        }
        return (
        <div style={{height:"100%"}}>
            <div style={{height:"60%"}}>
                <Bar data={this.props.graphData} updatePlan={(value)=> this.updatePlan(value)}/>
            </div>
            <div style={{height:"10%"}}>
                <h3>What you won't have to pay before your deductible with the {this.state.toDisplay}?</h3>
                    {info}
                <h3>Will I need a referral to see a specialist?</h3>
                    <p class="indent">{plan.needRefferal ? 'Yes':'No'}{yes_no}</p>
                <h3>Plan grade</h3>
                    <p class="indent">{plan.planGrade}</p>
            </div>
        </div>
        );}
}
export default Visualization