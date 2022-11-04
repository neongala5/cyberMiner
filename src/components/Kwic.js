import React from 'react';
import '../App.css';

class Kwic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            circularShifts: [],
            alphabetizedList: [],
            userInputArrayList: []
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
            alert("Only white space or nothing was entered")
            this.setState({
                userInput: "",
                alphabetizedList: [],
                circularShifts: [],
                userInputArrayList: []
            });
        } else {
            let userInputArray = this.state.userInput.split("\n");
            let allCircularShifts = [];
            let allAlphabetized = [];

            this.setState({
                userInputArrayList: userInputArray
            });

            let descriptionArray = [] 
            let urlArray = []

            userInputArray.forEach(element => {

                //add website logic here
                let description = element.substring(element.indexOf(" ")).trim();
                let url = element.substring(0, element.indexOf(" "));
                urlArray.push(url)
                descriptionArray.push(description);
            });

            for(let i =0;i<urlArray.length;i++){
                let wordsInThisLine = descriptionArray[i].trim().split(" ");
                let noiselessWordsInThisLine = [];
                wordsInThisLine.forEach(word => {
                    if (!word.toLowerCase().localeCompare("a") || !word.toLowerCase().localeCompare("the") || !word.toLowerCase().localeCompare("of")) {
                        //do nothing here cause we dont want the noise words
                    } else {
                        noiselessWordsInThisLine.push(word);
                    }
                })
                noiselessWordsInThisLine.forEach(line => {
                    allCircularShifts.push(noiselessWordsInThisLine.join(' ') + " : " + urlArray[i]);
                    this.arrayRotate(noiselessWordsInThisLine);
                });
                this.props.addWebsite(urlArray[i], noiselessWordsInThisLine.join(' '))
            }

            this.setState({
                circularShifts: allCircularShifts
            });
            allAlphabetized = [...allCircularShifts];
            allAlphabetized.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            this.setState({
                alphabetizedList: allAlphabetized
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
                <textarea maxLength="524288" className="inputTextArea" type="text" rows="3" placeholder="Enter lines of website urls along with their descriptions. Example: https://www.google.com/ Google search is provided by Google" name="body" value={this.state.userInput} onChange={this.onChange} />
                <input type="submit" />
                <div className='cardContainer'>
                    <div className="card">
                        <div className="container">
                            <h4><b>User Input Is:</b></h4>
                            {this.state.userInputArrayList.map((answer, i) => {
                                return (<p key={answer + i} >{answer}</p>)
                            })}
                        </div>
                    </div>
                    <div className="card">
                        <div className="container">
                            <h4><b>Circular shifted descriptions with no noisewords and their urls:</b></h4>
                            {this.state.circularShifts.map((answer, i) => {
                                return (<p key={answer + i} >{answer}</p>)
                            })}
                        </div>
                    </div>
                    <div className="card">
                        <div className="container">
                            <h4><b>Alphabetized list of descriptions with no noisewords together with their urls:</b></h4>
                            {this.state.alphabetizedList.map((answer, i) => {
                                return (<p key={answer + i} >{answer}</p>)
                            })}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default Kwic;