import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faSpinner, faClipboardCheck, faHandshake, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import * as auth from '../../../api/auth';
import { connect } from 'react-redux';
class AdminMenu extends Component {
    constructor(props){
        super(props);
        this.signOut = this.signOut.bind(this);

    }
    signOut() {
        this.props.signOut();
      }
    render(){
        return (
            <div className="adminSideBar">
                <ul>
                    <li><NavLink to="/admin/" activeClassName='is-active'>Панель управления</NavLink></li>
                    <li><NavLink to="/admin/newreqs" activeClassName='is-active'><FontAwesomeIcon icon={faFolder} /> Новые заявки</NavLink></li>
                    <li><NavLink to="/admin/processreqs" activeClassName='is-active'><FontAwesomeIcon icon={faSpinner} /> Заявки в процессе</NavLink></li>
                    <li><NavLink to="/admin/readyreqs" activeClassName='is-active'><FontAwesomeIcon icon={faClipboardCheck} /> Готовые заявки</NavLink></li>
                    <li><NavLink to="/admin/givenreqs" activeClassName='is-active'><FontAwesomeIcon icon={faHandshake} /> Выданные заявки</NavLink></li>
                    <li><Link className="bottom" to="/" onClick={this.signOut}><FontAwesomeIcon icon={faHandshake} /> Выйти из системы</Link></li>
                </ul>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      secret: state.dash.secret
    }
  }
  
export default connect(mapStateToProps, auth)(AdminMenu);