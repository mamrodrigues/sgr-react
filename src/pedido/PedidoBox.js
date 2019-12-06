import React, {Component} from 'react';
import PedidoCadastro from './PedidoCadastro';
import PedidoLista from './PedidoLista';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class PedidoBox extends Component {
  constructor(){
    super();
    this.state = {produtos:[]};
  }

  render(){
    return (
      <div>
        <div className="header">
          <h3>Cadastro de Pedidos</h3>
        </div>

        <PedidoCadastro comandaId={this.props.match.params.comandaId} pedidos={this.state.pedidos}/>
        {
          (typeof this.state.produtos !== 'undefined' && this.state.produtos.length != 0) ? <PedidoLista comandaId={this.props.match.params.comandaId} produtos={this.state.produtos}  pedidos={this.state.pedidos}/> : null
        }
      </div>
    );
  }

  componentDidMount(){
    this.setState({ comandaId: this.props.match.params.comandaId }, () => {
      console.log("componentDidMount");
      this.carregaLista();
    });

    PubSub.subscribe('produtos-por-comanda-lista', function(topico){
      console.log("PubSub");
      this.carregaLista();
    }.bind(this));

    PubSub.subscribe('pedido-lista', function(topico){
      this.carregaLista();
    }.bind(this));

  }

  carregaLista(){
    $.ajax({
        url:"http://localhost:8080/sgr/pedidos/comandas/"+this.state.comandaId,
        dataType: 'json',
        success:function(pedidos){
          console.log('pedidos', pedidos)
          this.setState({ pedidos: pedidos }, () => {
            this.detalhaPedido();
          });

        }.bind(this)
      });
  }

  detalhaPedido(){
    $.ajax({
        url:"http://localhost:8080/sgr/comandas/"+this.state.comandaId+"/produtos",
        dataType: 'json',
        success:function(produtos){
          console.log('produtos', produtos);
          this.setState({ produtos: produtos }, () => {
            //console.log(produtos, this.state.produtos);
          });

        }.bind(this)
      }
    );
  }

}
