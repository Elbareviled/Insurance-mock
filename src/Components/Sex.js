import React, {Component} from 'react';

class Sex extends Component{
    
    constructor(props){
        super(props);
        
    }

    render(){
        return(
        <div class="form-group">
            <p>Enter Your Biological Sex</p>

            <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="defaultGroupExample1" name="groupOfDefaultRadios"/>
                <label class="custom-control-label" for="defaultGroupExample1">Male</label>
            </div>

            <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="defaultGroupExample2" name="groupOfDefaultRadios"/>
                <label class="custom-control-label" for="defaultGroupExample2">Female</label>
            </div>

            <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="defaultGroupExample3" name="groupOfDefaultRadios"/>
                <label class="custom-control-label" for="defaultGroupExample3">Other</label>
            </div>
                
            
        </div>
        );
    }
}
export default Sex
