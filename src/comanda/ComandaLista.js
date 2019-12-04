import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class ComandaLista extends Component {

  constructor(){
    super();
    this.state = {comandas:[]};
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.comandas.map(function(comanda){
                return(
                  <tr>
                    <td>{comanda.nome}</td>
                    <td><button onClick={(e) => this.detalharComanda(comanda)} className="pure-button pure-button-primary">Detalhar</button></td>
                    <td><a href={"/produtosPorComanda/"+comanda.comandaId}>FAZER PEDIDO</a></td>
                  </tr>
                )
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    );
  }

  detalharComanda(comanda){
    PubSub.publish('comanda-editar', comanda);
  }

}
