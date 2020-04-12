import React, {Component} from 'react';
import Animated from './PreExistingSVG.svg';
class PEC extends Component{

    constructor(props){
        super(props);
        this.state = {
            PECS: ['']
        }
        this.addPEC = this.addPEC.bind(this);
    }

    addPEC(){
        this.setState({PECS: [...this.state.PECS, this.props.currentAnswer]});
        console.log(this.state.PECS);
        console.log(this.props.currentAnswer);
    }

    render(){
        return(
            <div>
                <div>
                <object type="image/svg/xml" data={Animated}></object>
                </div>
                <div class="form-group" onSubmit={this.handleSubmit}>
                    <label for="enterAge">Enter Any Prexisting Conditions You Have</label>
                    <input style={{textAlign:"center"}} class="form-control" id="enterAge" onChange={this.props.handleChange}/>
                    <button 
                        class="btn btn-info btn-block my-4" 
                        type="button" 
                        onClick={this.addPEC}>
                        Add</button>
                </div>
                {this.state.PECS.map((item, index) => (
                    <p key={index} item={item}>{item}</p>
                ))}
            </div>
        );
    }

}

export default PEC