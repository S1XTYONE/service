import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as auth from '../../../api/auth';
import CustomInput from '../../../components/actions/CustomInput';
import '../../../assets/css/main.css';
import '../../../assets/css/libs.css';
import 'babel-polyfill';

class Login extends Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(formData) {
        await this.props.signIn(formData);
        console.log(this.props)
        if (!this.props.errorMessage && this.props.name === 'admin'){
            this.props.history.push('/admin');
            location.reload()
        }
        if(!this.props.errorMessage && this.props.name !== 'admin' ){
            this.props.history.push('/new');
            location.reload();
        }
      }
    render(){
        const { handleSubmit } = this.props;
        return(
            <div className="lf flex">
                <div className="loginform">
                    <div className="lf-header">
                        Вход
                    <div className="circle"><img src="http://aues.kz/wp-content/uploads/2018/09/log_aues_cdr-red-1-1-1024x1024-300x300.png" width="100"/></div>
                    </div>
                    <div className="lfbody">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="login"
                                type="text"
                                id="email"
                                label="Enter your email"
                                placeholder="Ваш логин"
                                component={ CustomInput } />
                            </fieldset>
                            <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                label="Enter your password"
                                placeholder="Ваш пароль"
                                component={ CustomInput } />
                        </fieldset>
                            <button type="submit" class="loginBtn">Войти</button>
                            <div className="remember">
                                <input type="checkbox"/> запомнить
                                <a href="" >забыли пароль?</a>
                            </div>
                            
                        </form>
                    </div>
                    { this.props.errorMessage ? 
                    <div className="alert alert-danger">
                    { this.props.errorMessage }
                    </div> : null }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      errorMessage: state.auth.errorMessage,
      name:state.auth.name
    }
  }
  
export default compose(
    connect(mapStateToProps, auth),
    reduxForm({ form: 'signin' })
  )(Login)