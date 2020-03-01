import React, {Component} from 'react';

class NumberFamily extends Component{
    
    constructor(props){
        super(props);
        
    }

    render(){


        return(

            <div class="form-group">
            <label for="enterAge">How many people are in your family?</label>
            <input style={{height:100, width:75, margin:"auto",fontSize:"40px"}} value={this.props.currentAnswer} maxLength="2" class="form-control" id="enterAge" onChange={this.props.handleChange}/>
            </div>


        );


    }

}

export default NumberFamily