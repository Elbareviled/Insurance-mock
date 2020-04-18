import React, {Component} from 'react';
import Animated from './SalarySVG.svg'
class Income extends Component{
    
    constructor(props){
        super(props);
        
    }

    render(){

        const incomeStyle={
            width: 400,
            fontSize: 30,
            margin: "auto",
            textAlign: "center"
        }
        return(
           <div class="form-group"> 
                <p>Enter Estimated Yearly Income</p>
                <div class="input-group mb-3" style={incomeStyle}>
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input 
                        style={{textAlign:"center"}} 
                        value={this.props.currentAnswer}
                        id="income" 
                        type="text" 
                        class="form-control" 
                        onChange={this.props.handleChange}
                        />
                    
                </div>
            </div>
        );
    }
}
export default Income