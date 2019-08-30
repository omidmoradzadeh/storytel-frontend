import { Button, Paper, TextField } from "@material-ui/core";
import React, { FormEvent, PureComponent } from "react";
import { login } from "../../Services/Authentication.Service";
import './Login.Style.scss';
import { MessageTypes } from "../../DataTypes/Enums/MessageTypes.Enums";

interface ILoginProps {
    onLogin: (token: string) => void;
    onError: (error: { title: string , messageType: MessageTypes }) => any
};

export class Login extends PureComponent<ILoginProps> {

    public onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { onLogin } = this.props;
        const username = (e.target as any)["username"].value
        const password = (e.target as any)["password"].value
        login(username, password)
            .then(onLogin)
            .catch((e) => { this.props.onError({ ...e , messageType: MessageTypes.Error })}); 
    }
    public render() {
        return <Paper className="login-paprer">
            <form className='login' onSubmit={this.onSubmit} >
                <TextField
                    id="standard-name"
                    label="Username"
                    margin="normal"
                    name="username"
                    type="TextField"
                />
                <TextField
                    id="standard-name"
                    label="Password"
                    margin="normal"
                    name="password"
                    type="password"
                />
                <Button variant="outlined" color="primary" className="login-button" type="submit">
                    Login
                </Button>
            </form>
        </Paper>
    }
}