import React from 'react';
import './App.css';
import Search from './components/Search';
import MyTable from './components/MyTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends React.Component {

  state = {
    search1: '',
    search2: '',
    result1 : {},
    result2 : {},
    view1 : {},
    view2 : {},
    combined : {},
    combinedView : {},
    view : 'full',
    full : 'dark',
    diff : 'secondary',
  };

  fullview = () => {    
    this.setState({'view': 'full'});
    this.setState({'full': 'dark'});
    this.setState({'diff': 'secondary'});
    this.setState({'view1': this.state.result1});
    this.setState({'view2': this.state.result2});
    this.setState({'combinedView': this.state.combined});
  };

  diffview = () => {
    this.setState({'view': 'diff'});
    this.setState({'full': 'secondary'});
    this.setState({'diff': 'dark'});
    this.setState({'view1': {}});
    this.setState({'view2': {}});
    this.setState({'combinedView': {}});
    let v1 = {};
    let v2 = {};
    let cv = {};

    for(let key in this.state.combined){

      if (this.state.result1[key] != this.state.result2[key]){
        v1[key] = this.state.result1[key];
        v2[key] = this.state.result2[key];
        cv[key] = key;
      };
      this.setState({'view1': v1});
      this.setState({'view2': v2});
      this.setState({'combinedView': cv});
    }
  };

  change = (event = {}) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    this.setState({[name]: value});
  };

  submit = (event ={}) => {
    event.preventDefault();
    const term = event.target.firstChild.defaultValue;
    fetch('https://swapi.dev/api/people/?search=' + term)
    .then((response) => response.json())
    .then((json) => {
      if(json.results.length){
        const x = json.results[0];
        const picked = (({ name, gender, height, mass, hair_color,  homeworld, starships }) => ({ name, gender, height, mass, hair_color, homeworld, starships }))(x);

        fetch(picked.homeworld)
        .then((response1) => response1.json())
        .then((json1) => {
          picked.homeworld = json1.name;

          let promises = [];          
          let starshipNames = [];

          for(let i = 0; i < picked.starships.length; i++){
            promises.push(fetch(picked.starships[i]).then((response) => response.json()).then((json)=>{starshipNames.push(json.name);}));
          }

          Promise.all(promises)
          .then((data) => {
            picked.starships = starshipNames.join(', ');

            console.log(this.state.view);
            if (event.target.firstChild.name === "search1"){
              this.setState({'result1': picked});     
              this.setState({'view1': picked});
            }else{
              this.setState({'result2': picked});
              this.setState({'view2': picked});
            }

            this.setState({'combined': picked});
            this.setState({'combinedView': picked});

            if(this.state.view === "diff"){
              this.diffview();
            }
            
          })
          .catch((error) => {
            console.error(error);
          });          

        })
        .catch((error) => {
          console.error(error);
        });

        

      }else{
        alert("Can't find any character!");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  render() {
    return (
    <div className="App">
        <Container>
          <Row>
            <Col sm={4}>
                <br />
                <br />
                <br />
              <ButtonGroup className="mb-2">
                <Button variant={this.state.full} onClick={this.fullview}>Full</Button>
                <Button variant={this.state.diff} onClick={this.diffview}>Difference</Button>
              </ButtonGroup>
            </Col>
            <Col sm={4}>
              <Search name="search1" onChange={this.change} onSubmit={this.submit} value={this.state.search1}></Search>
            </Col>
            <Col sm={4}>
              <Search name="search2" onChange={this.change} onSubmit={this.submit} value={this.state.search2}></Search>
            </Col>
          </Row>
          <Row>          
            <MyTable  combined={this.state.combinedView} items1={this.state.view1} items2={this.state.view2}></MyTable>
          </Row>
        </Container>
    </div>
  );
  }
  }

