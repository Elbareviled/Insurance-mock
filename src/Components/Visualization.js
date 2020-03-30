import React, { Component } from 'react';
import yes from '../icons8-checkmark.svg'
import Bar from './Bar';
import axios from 'axios';
import styles from '../App.css'; 
import Popup from "reactjs-popup";


  
class Visualization extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            toDisplay: "HDHP Premier",
            hasCompleted: false,
            recommendation: '',
            recommendation_reasoning: ""
            recommendationLong: "",
            colorArray: []
        };
        console.log("i'm in vizualization");
        
    }

    componentDidMount(){
        this.setState({hasCompleted:true})
        axios.post('http://localhost:5000/user/calculate/5e78e49fd526046594e9cbb9')
            // .then(res => console.log(res.data));
            .then(response => {
                this.setState({
                    recommendation: response.data.recommendation,
                    recommendation_reasoning: <div>{response.data.recommendation_reasoning.map((thing) => <p> {thing}.</p>)}</div>,
                    recommendationLong: <div>{response.data.recommendationLong.map((thing1) => <p> {thing1}.</p>)}</div>
                })
                console.log(response.data);
                console.log("recommendation: " + this.state.recommendation);
                console.log("recommendation reasoning: " + this.state.recommendation_reasoning);
                this.getColors();
            });

        
        this.setState({hasCompleted:true})
        console.log("recommendation outside: " + this.state.recommendation);
        
    }

    updatePlan(str){
        this.setState({toDisplay: str})
    }

    getColors(){
        let colors = ['#FF5050','#CC3300','#FF6600','#800000'];
        console.log(this.props.data);
        for(let i =0; i<this.props.data.length; i++){
            console.log(this.props.data[i], this.state.recommendation.split(" ")[0] + " " + this.state.recommendation.split(" ")[2]);
            if (this.props.data[i].planName === (this.state.recommendation.split(" ")[0] + " "+ this.state.recommendation.split(" ")[2])){
                colors[i] = "#0077c8";
                console.log(this.state.recommendation, "has color #0077c8");
            }
        }
        this.setState({colorArray:colors})
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
    
    joinRecommendation(){
        
    }
    
    render(){

        const PopupExample = () => (
            <Popup trigger={<button>?</button>} position="top left">
              {close => (
                <div>
                  {this.state.recommendationLong} 
                  <a className="close" onClick={close}>
                    &times;
                  </a>
                </div>
              )}
            </Popup>
          );

        console.log(this.props);
        if(!this.state.hasCompleted){ return null; }
        let plan = this.searchForPlanById(this.state.toDisplay, this.props.data);
        let info=<p class="indent">{plan.coveredBeforeDeductible.join(", ")}.</p>
        let yes_no;
        if(!plan.needRefferal){
        yes_no = <img src={yes} alt="yes check" style={{height: 18, marginLeft:5, marginBottom:-2}}/>
        }
        else{
        yes_no =null;
        }   
        return (
        <div style={{height:"100%"}}>
            
            <div style={{height:"75%", display:"flex", flexDirection:"row",borderBottom:"2px solid black"}}>
                <Bar data={this.props.graphData} updatePlan={(value)=> this.updatePlan(value)} colors={this.state.colorArray}/>
                <div style={{height:"100%", width:"40%", marginLeft:"5%", borderLeft:"2px solid black", paddingLeft:"15px", paddingTop:"30px"}}>
                    <p>What you won't have to pay before your deductible with the {this.state.toDisplay}?</p>
                        {info}
                    <p>Will I need a referral to see a specialist?</p>
                        <p class="indent">{plan.needRefferal ? 'Yes':'No'}{yes_no}</p>
                    <p>Plan grade</p>
                        <p class="indent">{plan.planGrade}</p>
                    <p>Standard Copay</p>
                        <p class="indent">{plan.inNetworkCopay}</p>
                    <p>Prescription Drug Cost</p> 
                        <p class="indent">{plan.inNetworkDrugCopayAvg}</p>
                    <p>In Network ER Visit</p>
                        <p class="indent">{plan.erVisitInNetwork}</p> 
                    <p>In Network Urgent Care</p>
                        <p class="indent">{plan.inNetworkUrgentCare}</p>
                </div>
            </div>
            <div style={{fontSize: "20px"}}>
                <PopupExample/>
                {this.state.recommendation_reasoning}
            </div>

            
        </div>
        );}
}
export default Visualization