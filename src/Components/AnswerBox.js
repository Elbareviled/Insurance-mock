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
            pastAnswers: []
        }
        this.postChange = this.postChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    handleChange(event){
        this.setState({currentAnswer: event.target.value});
    }

    postChange(){

        //deep copy the past answers and then push the last thing on stack
        let hi = []
        hi.push(this.state.currentAnswer)
        hi.concat(this.state.pastAnswers,hi)
        this.setState({pastAnswers: hi})
        //make the current empty
        this.setState({currentAnswer:''})
        let req = {current: this.state.current, value: this.state.currentAnswer}
        axios.post("http://localhost:5000/user/5e588b6b1e051bfb059c8b15", req)
        //increment
        this.setState({current: ++this.state.current})
        if(this.state.current == 5){
            this.props.hasFinishedForms();
        }

    }
    goBack(){
        //decrement the current
        this.setState({current: --this.state.current});
        //make the current answer the old current answer
        this.setState({currentAnswer: this.state.pastAnswers.slice(-1).pop()})
        //pop it off the stack
        this.setState({pastAnswers: this.state.pastAnswers.slice(0,-1)})

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