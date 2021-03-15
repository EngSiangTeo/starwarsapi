import React from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function replaceSpace(str) {
  return str.split('_').join(' ');
}

function MyTable ({combined, items1, items2}){

  return (
        <Container>
          <Row>
            <Col sm={4}>
            {     
              Object.keys(combined).map(item => (
                  <p className="text-center" key={item} ><b>{toTitleCase(replaceSpace(item))}</b></p>                  
              )) 
            }
            </Col>
            <Col sm={4}>
            {     
              Object.keys(items1).map(item => (
                  <p className="text-break" key={item}> {items1[item]}</p>
              )) 
            }
            </Col>
            <Col sm={4}>
            {     
              Object.keys(items2).map(item => (
                  <p className="text-break" key={item}> {items2[item]}</p>
              )) 
            }
            </Col>
          </Row>
        </Container>
    )
  
}
export default MyTable