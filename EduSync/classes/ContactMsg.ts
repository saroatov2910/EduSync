import React, { Component } from 'react'; 

class Msg extends Component {
    constructor(props) {
        super(props);
        this.state={
            msgId : props.msgId,
            msgText : props.msgText,
            msgDate : props.msgDate,
            msgSender : props.msgSender,
        }

    }

}