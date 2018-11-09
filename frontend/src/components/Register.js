import React, { Component } from "react";
import { throws } from "assert";
import axios from "axios";
import * as EmailValidateor from 'email-validator';
class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            confirmpassword: "",
            hasError: false,
            errorText: 0,
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this)
        this.onClick = this.onClick.bind(this)
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value })
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value })
    }
    handleChangeConfirmPassword(event) {
        this.setState({ confirmpassword: event.target.value })
    }
    onClick(){
        var data = {
            email: this.state.email,
            password: this.state.password,
        }
        if (data.password != this.state.confirmpassword || data.password == "" || this.state.confirmpassword == "") {
            this.setState({ hasError: true, errorType: 1 })
        } else if (!EmailValidateor.validate(data.email)) {
            this.setState({ hasError: true, errorType: 2 })
        } else {
            axios.post("http://localhost:3001/register", data).then((res) => {
                if (res.data.status) {
                    this.props.history.push('/')
                } else {
                    this.setState({hasError: true, errorType: 3})
                    this.setState({password:""})
                    this.setState({confirmpassword:""})
                }
            })
        }
    }
    errorText = () =>{
        if(this.state.errorType==1){
            return <div class="notification is-danger">Please fill in all field</div>
        }else if(this.state.errorType==2){
            return <div class="notification is-danger">Invalid Email Format</div>
        }else{
            return <div class="notification is-danger">Email is already Exist</div>
        }
    }

    render() {
        return (
            <div id="root">
                <section class="section hero is-fulllength has-backgorund-white-ter">
                    <div class="hero-body">
                        <div class="container">
                            <div class="columns is-mobile is-centered">
                                <div class="column is-two-fifths">
                                    <div class="box">
                                        <div class="media-content">
                                            <h1 class="title">Register</h1>
                                            {this.state.hasError && this.errorText()}
                                            <div class="field">
                                                <div class="control">
                                                    <input class="input is-large" type="email" placeholder="Email" onChange={this.handleChangeEmail} value={this.state.email}></input>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <input class="input is-large" type="password" placeholder="Password" onChange={this.handleChangePassword} value={this.state.password}></input>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <input class="input is-large" type="password" placeholder="Confirm Password" onChange={this.handleChangeConfirmPassword} value={this.state.confirmpassword}></input>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <button class="button is-fullwidth is-info is-large" onClick={this.onClick}>Register</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Register;