import { Button, List, ListItem, ListItemText, makeStyles, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import "./Todo.css"
import db from "./firebase"
import { DeleteForever } from '@material-ui/icons'
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [input,setInput] = useState("")
    const updateTodo = (e) =>{
        db.collection("todos").doc(props.todo.id).set({
            todo:input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        },{merge: true})
        setOpen(false)
    }
    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}><h1>open</h1>
            <input placeholder={props.todo.todo} value={input} onChange={e => setInput(e.target.value)}/>
            <Button onClick={updateTodo}>Update</Button></div>
        </Modal>
        <List className="todo__list">
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary="Dummy Deadline" />
            </ListItem>
            <button onClick = {e => setOpen(true)}>Edit</button>
            <DeleteForever onClick={event => db.collection("todos").doc(props.todo.id).delete()}/>
        </List>
        </>
    )
}

export default Todo
