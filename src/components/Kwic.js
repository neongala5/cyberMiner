import React from 'react';
import '../App.css';

class Kwic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            circularShifts: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = e => {
        this.setState({
            userInput: e.currentTarget.value,
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.userInput.trim() === '') {
            console.log("Only white space or nothing was entered")
            this.setState({
                userInput: "",
                circularShifts: []
            });
        } else {
            console.log("User input is: \n" + this.state.userInput + "\n\n");
            console.log("Circular shifts: \n")

            let userInputArray = this.state.userInput.split("\n");
            let allCircularShifts = [];

            userInputArray.forEach(element => {
                let wordsInThisLine = element.split(" ");
                wordsInThisLine.forEach(line => {
                    this.arrayRotate(wordsInThisLine);
                    allCircularShifts.push(wordsInThisLine.join(' '));
                    console.log(wordsInThisLine.join(' '))
                });
            });
            allCircularShifts.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            console.log("\nAlphebetized list:")
            console.log(allCircularShifts.join('\n'));
            this.setState({
                circularShifts: allCircularShifts
            });
        }
    }

    arrayRotate(arr) {
        arr.push(arr.shift());
        return arr;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="App">
                <textarea type="text" rows="3" placeholder="Enter lines of text you wish to circularly shift" name="body" value={this.state.userInput} onChange={this.onChange} />
                <input type="submit"/>
                {this.state.circularShifts.map((answer, i) => {
                    // Return the element. Also pass key     
                    return (<p key={answer} >{answer}</p>)
                })}
            </form>

        );
    }
}

export default Kwic;