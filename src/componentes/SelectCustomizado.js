import React, { Component } from 'react';

export default class SelectCustomizado extends Component{

    render() {
        return(
          <div className="pure-control-group">
            <label htmlFor={this.props.id}>{this.props.label}</label>

            <select name={this.props.nome} id={this.props.id} onChange={this.props.onChange}>
                {
                  this.props.lista.map(function(object){
                      return <option value={object.id}>{object.nome}</option>
                  })
                }
            </select>
          </div>
      );
    }
}
