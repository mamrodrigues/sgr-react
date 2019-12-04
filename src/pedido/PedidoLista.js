import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class PedidoLista extends Component {

  constructor(){
    super();
    this.state = {pedidos:[]};
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.pedidos.map(function(pedido){
                return(
                  <tr>
                    <td>{pedido.produto.nome}</td>
                    <td>{pedido.produto.descricao}</td>
                    <td>{pedido.produto.valor}</td>
                    <td><button onClick={(e) => this.cancelarPedido(pedido)} className="pure-button pure-button-primary">Cancelar Pedido</button></td>
                  </tr>
                );
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    );
  }

  cancelarPedido(pedido){
    $.ajax({
        url:"http://localhost:8080/sgr/pedidos/"+pedido.pedidoId,
        type: 'delete',
        success:function(resposta){
          PubSub.publish('pedido-lista');
        },
        error: function(){
          console.log("error");
        }
      }
    );
  }

}
