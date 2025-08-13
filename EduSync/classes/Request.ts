import React from 'react';

export default class Request {
  requestId = '';
  requestText = '';
  requestDate = '';
  reqStatus = '';

  constructor(requestId, requestText, requestDate, reqStatus) {
    this.requestId = requestId;
    this.requestText = requestText;
    this.requestDate = requestDate;
    this.reqStatus = reqStatus;
  }
}

// class Request extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             requestId: props.requestId,
//             requestText: props.requestText,
//             requestDate: props.requestDate,
//             reqSstus: props.reqStatus,
//             studentId. props.studentId,

//         };

//     }


// }
 