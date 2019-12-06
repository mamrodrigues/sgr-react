import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class PedidoLista extends Component {

  constructor(){
    super();
    this.state = {pedidos:[], valorTotal:0};

    // PubSub.subscribe('comanda-valor', function(chave, valor){
    //   this.setState({valorTotal: valor});
    //
    // }.bind(this));
  }

  render(){
    var val=0;
    var indice=1;
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th> </th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Observação</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.pedidos.map(function(pedido){
                val = val + parseInt(pedido.produto.valor);
                console.log(val);
                  return(
                    <tr>
                      <td>{indice++}</td>
                      <td>{pedido.produto.nome}</td>
                      <td>{pedido.produto.descricao}</td>
                      <td>R$ {pedido.produto.valor},00</td>
                      <td>{pedido.observacao}</td>
                      <td><button onClick={(e) => this.cancelarPedido(pedido)} className="pure-button pure-button-primary">Cancelar Pedido</button></td>
                    </tr>
                  );

              }.bind(this))
            }
          </tbody>
        </table>

        {
          this.props.pedidos != null ?
              <h4> Valor Total: R$ {val},00</h4>
           : null
        }
      </div>
    );
  }

  cancelarPedido(pedido){
    this.state.valorTotal = 0;
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
