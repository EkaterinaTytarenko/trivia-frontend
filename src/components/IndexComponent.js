import React from 'react';
import IndexService from "../services/IndexService";
import GameComponent from "./GameComponent";
import ReactDOM from "react-dom";
import 'react-widgets/dist/css/react-widgets.css';
import MultiSelect from "@khanacademy/react-multi-select";
import Select from 'react-select';


class IndexComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            allCategories:[],
            difficulty: '',
            chosenCategories:[],
            type:'',
            number: ''
        }
    }

    componentDidMount(){
        IndexService.getCategories().then((response) => {
            this.setState({ allCategories: Array.from(response.data)})
        });
    }


    submitForm = async event => {

        event.preventDefault();
        if(this.state.difficulty==''||this.state.chosenCategories==[]||this.state.type==''||this.state.number=='')
            alert("Please,choose all the properties!")
        else {
            IndexService.postForm({
                difficulties: this.state.difficulty,
                categories: this.state.chosenCategories.toString(),
                types: this.state.type,
                number: this.state.number
            }).then(response => {
                ReactDOM.render(<GameComponent questions={response.data}/>, document.getElementById('root'));
            })
                .catch(err => {
                    alert("Something went wrong.Please, fill the form again");
                    this.render();
                });

        }
    }

    render (){

        var difficulties=[
            {label:'Mixed',value:'easy,medium,hard'},
            {label:'Easy',value:'easy'},
            {label:'Medium',value:'medium'},
            {label:'Hard',value:'hard'}
        ];

        var categories = [];
        this.state.allCategories.map(
            category =>categories.push({
                label:category,
                value:category
            }));

        var types=[
                {label:'Mixed',value:'boolean,multiple'},
                {label:'True/False',value:'boolean'},
                {label:'4 options',value:'multiple'}
        ];

        var numbers=[
            {label:'5',value:'5'},
            {label:'10',value:'10'},
            {label:'15',value:'15'},
            {label:'20',value:'20'}
        ];

        return (
                <form onSubmit={this.submitForm}>
                    <div className="form-grid">
                        <h4>Select difficulty:</h4>
                        <Select
                            options={difficulties}
                            onChange={val => this.setState({difficulty:val.value})}
                        />
                    </div>
                    <div className="form-grid">
                        <h4>Select categories:</h4>
                        <MultiSelect
                            options={categories}
                            selected={this.state.chosenCategories}
                            onSelectedChanged={selected => this.setState({chosenCategories:selected})}
                        />
                    </div>
                    <div className="form-grid">
                        <h4>Select type:</h4>
                        <Select
                            options={types}
                            onChange={val => this.setState({type:val.value})}
                        />
                    </div>
                    <div className="form-grid">
                        <h4>Select number of questions:</h4>
                        <Select
                            options={numbers}
                            onChange={val => this.setState({number:val.value})}
                        />
                    </div>
                    <div className="control">
                        <button type="submit" className="start-btn btn">Start</button>
                    </div>
                </form>

        )
    }
}

export default IndexComponent