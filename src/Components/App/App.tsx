import React, { PureComponent } from 'react';
import { getToken } from '../../Services/Authentication.Service';
import { Login } from '../Login/Login.component';
import { MessageList } from '../MessageList/MessageList.Component';
import { Snackbar } from '@material-ui/core';
import { MessageTypes } from '../../DataTypes/Enums/MessageTypes.Enums'

interface IAppState {
  isLoggedIn: boolean,
  alert?: { title: string, messageType: MessageTypes },
}

class App extends PureComponent<any, IAppState> {

  public state = { isLoggedIn: !!getToken(), alert: undefined }


  public onLogin = (data: any) => {
    this.setState({ isLoggedIn: !!(data)})
  }

  public onLoggedOut = () => {
    this.setState({ isLoggedIn: false })
  }

  public handleClose = (e: any) => {
    this.setState({ alert: undefined })
  }

  public onError = (error: { title: any, messageType: any }) => this.setState({ alert: error });

  public render() {
    const { isLoggedIn, alert } = this.state;
    const open = !!alert;

   let messageTypeClass = `${alert ? `snackbar-${MessageTypes[(alert as any).messageType].toLowerCase()}` : ""} base-snackbar`

    return (
      <div>
        {
          isLoggedIn
            ? <MessageList onError={this.onError} onLoggedOut={this.onLoggedOut} />
            : <Login onError={this.onError} onLogin={this.onLogin} />
        }

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          className={messageTypeClass}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={<span id="message-id">{alert && (alert as any).title ? (alert as any).title : (alert ? "unknown error" : "")}</span>}
        >

        </Snackbar>
      </div>
    );
  }
}


export default App;
