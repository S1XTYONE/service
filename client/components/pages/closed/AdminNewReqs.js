import React, { Component } from 'react';
import AdminMenu from './AdminMenu';
import { Table,Button,Input } from 'reactstrap';
import {getInformationAboutApps,sendApplicationAndChangeStatus} from '../../../api/index'


export default class AdminNewReqs extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      statusID: null,
      data1:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleChange=(event)=>
  {
    var data = this.state.data2
    var result = data.filter(function(el){
      return el.studentName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    })
    this.setState({
      data:result,
      dlina:result.length
    })
     
    
  }

  handleClick(event)
  {
    event.preventDefault()
    let statusidhidden = Number(document.getElementById('statusidhidden').value)
    console.log(statusidhidden)
    let applicationID = Number(event.target.id)
    var index = this.state.data.map(function(e) { return e.applicationID; }).indexOf(applicationID);
    console.log(index)
    console.log(this.state.data.splice(index, 1))
    console.log(this.state.data)
    this.setState({data:this.state.data , dlina:this.state.data.length});
    console.log(this.state.data)
    const data ={
      applicationID:event.target.id,
      statusID:statusidhidden
    }
    sendApplicationAndChangeStatus(data)
  }
 
  componentWillMount()
  {
    getInformationAboutApps('http://localhost:3001/newapp')
    .then((response)=>{
      //console.log(response)
      this.setState({
        data:response,
        dlina:response.length,
        data2:response,
        dlina2:response.length
      })
    })   
  }
    
  componentDidUpdate()
  {
    
  }

  createTableSentStatus=()=>{
    let table = []
    for ( let i=0;i<this.state.dlina;i++)
    {
      let field = this.state.data[i]
      let options = { day: 'numeric', month: 'numeric', year: 'numeric', hour:'numeric',minute:'numeric',second:'numeric' }
      let datetime = new Date(field.applicationDateTime).toLocaleDateString("ru-RU",options)
      table.push(
        <tr key={field.applicationID}>
        <th scope="row" ref="appID" >{field.applicationID}</th>
        <td>{field.studentName}</td>
        <td>{field.applicationIdent}</td>
        <td>{field.FormName}</td>
        <td>{datetime}</td>
        <td>{field.statusName}</td>
        <input type="hidden" id="statusidhidden" value={field.statusID}/>
        <td><Button  onClick={this.handleClick} id = {field.applicationID}>Взять в обработку</Button></td>
      </tr>
      )
    }
    return table;
  }

    render(){
        return(
            <div>
                <AdminMenu />
                <div className="fll">
                    <div className="mainTable">
                        <h1>Новые заявки</h1>
                        <Input type="text"  onChange={this.handleChange} placeholder="Поиск по заявкам..." /><br/>
                            <Table dark>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>ФИО</th>
                                    <th>Идентификатор заявки</th>
                                    <th>Документ</th>
                                    <th>Время</th>
                                    <th>Статус</th>
                                    <th>Действие</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {
                                    this.createTableSentStatus()
                                }
                                </tbody>    
                          </Table>
                    </div>
                </div>
            </div>
        )
    }
}