import React, {Component} from 'react';
import axios from 'axios';
import Age from './Age';
import Sex from './Sex';
import Income from './Income';
import NumberFamily from './NumberFamily';
import PEC from './PEC';
class AnswerBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentAnswer:'',
            questions: [],
            current: 0,
        }
        this.postChange = this.postChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    handleChange(event){
        this.setState({currentAnswer: event.target.value});
    }

    postChange(){
        //console.log(this.state.currentAnswer);
        //post current answer to server
        this.setState({current: ++this.state.current})
        console.log(this.state.current);
        if(this.state.current == 5){
            this.props.hasFinishedForms();
        }
    }
    goBack(){
        this.setState({current: --this.state.current});
        console.log(this.state.current);

    }

    render(){
        return(
        <div style={{textAlign:"center",width:"60%", margin:"auto", paddingTop:100, fontSize:"24px"}}>
            <form>
                {this.state.current == 0 ? <Age handleChange={this.handleChange} currentAnswer={this.state.currentAnswer}></Age>:''}
                {this.state.current == 1 ? <Sex handleChange={this.handleChange} currentAnswer={this.state.currentAnswer}/>:''}
                {this.state.current == 2 ? <Income handleChange={this.handleChange} currentAnswer={this.state.currentAnswer}/>:''}
                {this.state.current == 3 ? <NumberFamily handleChange={this.handleChange} currentAnswer={this.state.currentAnswer}/>:''}
                {this.state.current == 4 ? <PEC handleChange={this.handleChange} currentAnswer={this.state.currentAnswer}/>:''}
                <div class="btn-group">
                    <button type="button" class="btn btn-info" onClick={this.goBack}>Prev</button>
                    <button type="button" style={{marginLeft:5}} class="btn btn-info" onClick={this.postChange}>Next</button>
                </div>
            </form>
        </div>
        );
    }


}
export default AnswerBox