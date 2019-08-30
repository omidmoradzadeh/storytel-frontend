import { IMessage } from "../../Services/Message.Service";
import React from "react";
import { Fab } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import "../Message/Message.Style.scss"

export interface IMessageProps {
    message: IMessage,
    onEdit: (message: IMessage) => any,
    onDelete: (message: IMessage) => any,
}

export function Message({ message, onEdit, onDelete }: IMessageProps) {
    return <div>

        <Fab aria-label="Edit" className="fab" onClick={(e) => { e.preventDefault(); onEdit(message); }}>
            <EditIcon />
        </Fab>
        <Fab color="secondary" aria-label="Delete" className="fab" onClick={(e) => { e.preventDefault(); onDelete(message); }}>
            <DeleteIcon />
        </Fab>

    </div>
}