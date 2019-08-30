import { PureComponent, ChangeEvent } from "react";
import React from "react";
import { getMessages, IMessage, deleteMessage, editMessage, addMessage } from "../../Services/Message.Service";
import { Message } from "../Message/Message.Component";
import { MessageInput } from "../MessageInput/MessageInput.Component";
import { MessageTypes } from "../../DataTypes/Enums/MessageTypes.Enums";
import "../MessageList/MessageList.Style.scss";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface IMessageListState {
    list: { data: IMessage[] },
    selectedMessage: IMessage
}

interface IMessageListProps {
    onLoggedOut: () => any
    onError: (error: { title: string, messageType: MessageTypes }) => any
}

export class MessageList extends PureComponent<IMessageListProps, IMessageListState> {
    public state: IMessageListState = { list: { data: [] }, selectedMessage: {} }

    public componentDidMount() {
        getMessages()
            .then((list) => { this.setState({ list: { data: list } }) })
            .catch(e => this.handelError(e))
    }

    public onDelete = (message: IMessage) => {
        deleteMessage(message.id as number)
            .then(() => {
                const newList = this.state.list.data.filter((m) => m.id !== message.id);
                this.setState({ list: { data: newList } });
            })
            .catch(e => this.handelError(e))
    }

    public onEdit = (message: IMessage) => {
        this.setState({ selectedMessage: message })
    }

    public onSave = (message: IMessage) => {
        if (message.id) {
            editMessage(message)
                .then(() => {
                    const newList = this.state.list.data.map((msg) => msg.id !== message.id ? msg : message);
                    this.setState({ list: { data: newList }, selectedMessage: { text: "" } });
                })
                .catch(e => this.handelError(e))
        } else {
            if (!!message.text)
                addMessage(message.text as string)
                    .then(({ id }) => {
                        const { list } = this.state;
                        var today = new Date();
                        this.setState({ list: { data: [{ text: message.text, createDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(), id }, ...list.data] }, selectedMessage: { text: "" } })
                    })
                    .catch(e => this.handelError(e));
            else
                this.handelError("message can't be empty.")
        }
    }

    public onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        this.setState({ selectedMessage: { ...this.state.selectedMessage, text } })
    }

    private handelError(e: any): any {
        return e.status === 401 ? this.props.onLoggedOut() : this.props.onError({ title: e, messageType: MessageTypes.Error });
    }

    private convertDatetimeToDate(date: any): any {
        const index = date.indexOf("T");
        if (index > 0)
            return date.substr(0, index - 1)
        else return date;
    }

    public render() {
        const { list, selectedMessage } = this.state;
        return (
            <Paper className="message-list-paprer" >
                <MessageInput message={selectedMessage} onSubmit={this.onSave} onChange={this.onChange} />
                <h2 className="message-list-h2">Message List</h2>

                {list.data.length > 0 ?
                    <Table style={{ tableLayout: 'auto' }} className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Message</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>operation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                list.data.map(row => <TableRow key={row.id}>
                                    <TableCell >{row.text}</TableCell>
                                    <TableCell >{this.convertDatetimeToDate(row.createDate)}</TableCell>
                                    <Message key={row.id} message={row} onDelete={this.onDelete} onEdit={this.onEdit} />
                                </TableRow>)

                            }

                        </TableBody>
                    </Table>
                    : <div className="empty-message"><span className="span">Message list is empty</span></div>
                }
            </Paper>
        );
    }
}