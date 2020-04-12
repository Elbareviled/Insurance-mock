import React, { Component } from 'react';
import yes from '../icons8-checkmark.svg'
import Bar from './Bar';
import axios from 'axios';
import styles from '../App.css'; 
import Popup from "reactjs-popup";
import RestartButton from './RestartButton.js'



  
class Visualization extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            toDisplay: "HDHP Premier",
            hasCompleted: false,
            recommendation: '',
            recommendation_reasoning: [],
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
                    recommendation_reasoning: response.data.recommendation_reasoning,
                    recommendationLong: response.data.recommendationLong
                })
                console.log(response.data);
                console.log("recommendation: " + this.state.recommendation);
                console.log(this.state.recommendation_reasoning);
                this.getColors();
                
            })
            .then(()=>{
                this.addHover();
            });

        
        this.setState({hasCompleted:true})
        console.log("recommendation outside: " + this.state.recommendation);
        
    }

    updatePlan(str){
        this.setState({toDisplay: str})
    }

    getColors(){
        let colors = ['#FF3333','#FF6633','#FF9933','#FFCC33'];
        for(let i =0; i<this.props.data.length; i++){
            if (this.props.data[i].planName === (this.state.recommendation.split(" ")[0] + " "+ this.state.recommendation.split(" ")[2])){
                colors[i] = "#32BEA6";
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
    addHover(){
        console.log(this.state.recommendation_reasoning);
        var longRec = this.state.recommendationLong;
        var shortRec = this.state.recommendation_reasoning;
        var hi = this.state.recommendation_reasoning.map(function(x, i){
            return {"shortRec":shortRec[i], "longRec": longRec[i]}
        });
        console.log("hello");
        console.log(hi);
        var tags = hi.map((thing) =>{
        return <div>
            {thing.shortRec} &ensp;
                <Popup trigger={<button variant="primary" class="btn btn-info" size="sm" >Tell me more </button>} position="top left">
                    {close => (
                        <div>
                            {thing.longRec}
                            <a className="close" onClick={close}>&times;</a>
                        </div>
                    )}
                </Popup></div>
        });
        this.setState({recommendation_reasoning:tags});
        console.log(tags);
        

    }
    
    render(){

        const PopupExample = () => (
            <Popup trigger={<button>?</button>} position="center left">
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
            
            <div style={{height:"90%", display:"flex", flexDirection:"row",borderBottom:"2px solid black", fontSize:"14px"}}>
                <Bar data={this.props.graphData} updatePlan={(value)=> this.updatePlan(value)} colors={this.state.colorArray}/>
                <div style={{height:"100%", width:"40%", marginLeft:"5%", borderLeft:"2px solid black", paddingLeft:"15px", paddingTop:"10px"}}>
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
            <div style={{fontSize:"30px", fontWeight:"bold", fontStyle:"italic", color:"#32BEA6", marginBottom:"1%"}}>We highly suggest that you go with the {this.state.recommendation}</div>
            <div style={{fontSize: "16px"}}>
                {this.state.recommendation_reasoning}
            </div>

            <RestartButton></RestartButton>



            
        </div>
        );}
}
export default Visualization