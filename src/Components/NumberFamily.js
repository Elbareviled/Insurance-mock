import React, {Component} from 'react';
import Animated from './Family.svg';
class NumberFamily extends Component{
    
    constructor(props){
        super(props);
        
    }

    render(){


        return(
            
            <div class="form-group">
                <div>
                <object style={{height:240, width:240}}type="image/svg/xml" data={Animated}></object>
                </div>
            <label for="enterAge">How many people are in your family?</label>
            <input style={{height:100, width:75, margin:"auto",fontSize:"40px"}} value={this.props.currentAnswer} maxLength="2" class="form-control" id="enterAge" onChange={this.props.handleChange}/>
            </div>


        );


    }

}

export default NumberFamily