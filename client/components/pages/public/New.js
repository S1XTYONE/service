import React, { Component } from 'react';
import '../../../assets/css/main.css';
import '../../../assets/css/libs.css';
import 'babel-polyfill';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {getInformationAboutApps ,sendForm,checkApplication} from '../../../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as auth from '../../../api/auth';
var rn = require('random-number');
var qr = require('qr-image');

 class New extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalNew: false,
            modalCheck: false,
            data:[],
            valueSend:'',
            valueCheck:''
        }
        this.signOut = this.signOut.bind(this);
        this.toggleNew = this.toggleNew.bind(this);
        this.toggleCheck = this.toggleCheck.bind(this);
        this.handleSubmitSend = this.handleSubmitSend.bind(this);
        this.handleChangeSend = this.handleChangeSend.bind(this);
        this.handleSubmitCheck = this.handleSubmitCheck.bind(this);
        this.handleChangeCheck= this.handleChangeCheck.bind(this);
    }
    
    toggleNew(){
        this.setState({
            modalNew: !this.state.modalNew,
        })
    }
    
    toggleCheck(){
        this.setState({
            modalCheck: !this.state.modalCheck,
        })
    }

    signOut() {
        this.props.signOut();
      }

    async componentDidMount()
    {
        console.log(this.props)
        this.props.getSecret()
        getInformationAboutApps('http://localhost:3001/forms').then((findresponse)=>{
           console.log(findresponse)
           this.setState({
               data:findresponse
           })
       })
       
    }
  
    handleChangeSend(event){
        this.setState({valueSend:event.target.value})
    }
    handleChangeCheck(event)
    {
        this.setState({valueCheck:event.target.value})

    }
    handleSubmitCheck(event)
    {
        event.preventDefault();
        
        checkApplication(this.state.valueCheck)
        .then((response)=>{
            console.log(response)
            this.setState({
                applicationIdentCheck:response[0].applicationIdent,
                nameCheck:response[0].studentName,
                statusCheck:response[0].statusName,
                formName:response[0].FormName
            })
        })
        

    }
     
    headerChanger = () => {
        let header = [];
        if(this.state.applicationIdentCheck){
            header.push(
                
            <div>
                <ModalHeader toggle={this.toggleCheck}>Проверка заявки {this.state.applicationIdentCheck} </ModalHeader>
            <ModalBody>
            <ul>
            <li>Ф.И.О.: {this.state.nameCheck}</li>
            <li>Форма заявки: {this.state.formName}</li>
            <li>Статус: {this.state.statusCheck}</li>
            </ul>
            </ModalBody>
            </div>
            )
        }else{
            header.push(
            <div>
                <ModalHeader className="mh-red" toggle={this.toggleCheck}>Ошибка!</ModalHeader>
                <ModalBody>
                        <p>Извините, но заявки с таким идентификатором не найдена!</p>
                    </ModalBody>
            </div>
            )
        }
        
        return header;
    }
    
    handleSubmitSend(event)
    {
        let options = {
            min:  1000
          , max:  9999
          , integer: true
          }
        console.log(this.props.id)
        let applicationIdent =rn(options)
        var png_string = qr.imageSync('Ваш идентификатор заявки: '+applicationIdent, { type: 'png' });
        var base64_png_string = btoa(String.fromCharCode.apply(null,png_string))
        event.preventDefault();
        const data = {
            id :this.props.id,
            selectForm : this.refs.selectRef.value,
            comment:this.refs.commentRef.value,
            applicationIdent:applicationIdent,
            qrcode:png_string
        }
        console.log(data)
        this.setState({
            applicationIdent:data.applicationIdent,
            image : base64_png_string
        })
        sendForm(data)
    }
    
    render(){
        return(
            <div>
                <div className="container window-wrapper flex">
                    <div className="window flex">
                        <div className="window-left">
                            <div className="window-left__top hidden-xs">
                                <h1 className="top__header text-right">Добро пожаловать,<br/> {this.props.name}!</h1>
                                <p className="text text-right">С помощью нашей<br/>программы вы можете с<br/>легкостью оставить свою<br/>заявку , на рассмотрении,<br/>и легко проверить статус ее<br/>выполнения</p>
                            </div>
                            <div className="window-left__bottom">
                                <h1 className="top__header text-right">Проверить статус</h1>
                                <p className="text text-right">Чтобы проверить статус заявки,<br/> введите номер и нажмите enter</p>
                                <form action="" className="check-form" onSubmit={this.handleSubmitCheck}>
                                    <input type="text" value = {this.state.valueCheck} onChange={this.handleChangeCheck} placeholder="Номер заявки" className="check-input"/>
                                    <button onClick={this.toggleCheck}  className="check-button hidden-xs"><FontAwesomeIcon icon={faArrowRight} color="#fff" /></button>
                                </form>
                                
                            </div>
                        </div>
                        <div className="window-right">
                            <div className="window-right__header">
                                <h1 className="right-header text-center">Оставьте заявку</h1>
                            </div>
                            <div className="window-right__form">
                                <form action="" encType="multipart/form-data" className="right-form" onSubmit={this.handleSubmitSend}>
                                    <input type="text" className="new-input" value={this.props.name}/>
                                    <select ref="selectRef" className="new-input">
                                    <option value="--">Выбирите вид справки</option>
                                    {
                                        this.state.data.map((dynamicData ,key)=>
                                        <option key={dynamicData.FormID} value={dynamicData.FormID}>
                                            {dynamicData.FormName}
                                        </option>
                                        )
                                    }
                                    </select>
                                    <textarea ref="commentRef"  value={this.state.valueSend} onChange={this.handleChangeSend} className="new-input" placeholder="Сделайте 2 копии пожалуйста..." style={{resize: 'none'}} rows="9"></textarea>
                                    <button onClick={this.toggleNew} className="send btn-block">Отправить</button>
                                    <Link className="nav-link-right" to="/" onClick={this.signOut}>Выход из системы</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Modal centered isOpen={this.state.modalNew} toggle={this.toggleNew}>
                    <ModalHeader toggle={this.toggleNew}>Спасибо за заявку!</ModalHeader>
                    <ModalBody>
                        <div className="qrcode"><img width="100" src = {`data:image/png;base64,${this.state.image}`}  alt="qr"/></div>
                        <div className="info-text">Ваш QR-код! <p>Просканируйте его с помощью Вашего телефона  </p></div>
                    </ModalBody>
                    <ModalFooter>
                        Код заявки, сохраните его: <a><i className="fa fa-copy"></i></a> {this.state.applicationIdent}
                    </ModalFooter>
                </Modal>
                
                <Modal centered isOpen={this.state.modalCheck} toggle={this.toggleCheck}>
                    {this.headerChanger()}
                    <ModalFooter>
                        
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      secret: state.dash.secret
    }
  }
  
  export default connect(mapStateToProps, auth)(New);