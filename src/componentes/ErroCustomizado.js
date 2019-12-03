import React, { Component } from 'react';

export default class ErroCustomizado extends Component{

    render() {
        return(
          <div className="pure-control-group">
            <label id={this.props.id} style={{color: '#ff0000'}}>{this.props.mensagemErro}</label>
          </div>
      );
    }
}
