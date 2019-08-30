import { IMessage } from "../../Services/Message.Service";
import { TextField, Button } from "@material-ui/core";
import React, { FormEvent, ChangeEvent } from "react";
import "../MessageInput/MessageInput.Style.scss"

export interface IMessageInputProps {
    message: IMessage,
    onSubmit: (message: IMessage) => any
    onChange: (e: ChangeEvent<HTMLInputElement>) => any
}

export function MessageInput({ message, onChange, onSubmit }: IMessageInputProps) {

    function onSubmitForm(e: FormEvent) {
        e.preventDefault();
        onSubmit(message);
    }

    return <form onSubmit={onSubmitForm}>
        <div className="message-input">

            <TextField className ="message"
                label="Message"
                name="message"
                value={message.text}
                onChange={onChange}
                InputLabelProps={{ shrink: !!message.text }}
            />
            <Button variant="contained" color="primary" type="submit" >
                submit
            </Button>

        </div>

    </form>
}