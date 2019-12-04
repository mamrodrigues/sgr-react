import React, { Component } from 'react';

import ErroCustomizado from '../componentes/ErroCustomizado';

export default class InputCustomizado extends Component{

    render() {
        return(
          <div className="pure-control-group">
            <label htmlFor={this.props.id}>{this.props.label}</label>

            <input id={this.props.id} type={this.props.type} name={this.props.nome}
              value={this.props.value} maxlength={this.props.maxlength}
              minlength={this.props.minlength} onChange={this.props.onChange}/>

            { this.props.value ? null : <ErroCustomizado mensagemErro={this.props.mensagemErro}/> }
          </div>
      );
    }
}
