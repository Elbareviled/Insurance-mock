import React, {Component} from 'react';

class Age extends Component{
    
    constructor(props){
        super(props);
        
    }

    render(){
        return(
        <div class="form-group">
            <label for="enterAge">Enter Your Age</label>
            <input 
                style={{height:100, width:75, margin:"auto",fontSize:"40px"}} 
                value={this.props.currentAnswer} 
                maxLength="2"
                class="form-control" 
                id="enterAge" 
                onChange={this.props.handleChange}/>
        </div>
        );
    }
}
export default Age
