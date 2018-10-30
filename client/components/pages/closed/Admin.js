import React, { Component } from 'react';
import '../../../assets/css/main.css';
import '../../../assets/css/libs.css';
import AdminMenu from './AdminMenu';

export default class Admin extends Component {
    render(){
        return(
            <div>
                <AdminMenu />
                <div className="fll">
                    <div className="mainTable">
                        <h1>Здесь статистика</h1>
                        <p className="alert alert-success">
                            Здравствуйте, Admin!
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}