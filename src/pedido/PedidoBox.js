import React, {Component} from 'react';
import PedidoCadastro from './PedidoCadastro';
import ProdutoLista from './PedidoLista';
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

        <PedidoCadastro/>
        {
          (typeof this.state.produtos !== 'undefined' && this.state.produtos.length != 0) ? <ProdutoLista produtos={this.state.produtos}/> : null
        }


      </div>
    );
  }

  componentDidMount(){
    this.setState({comandaId:this.props.match.params.comandaId});

    this.carregaLista();
    PubSub.subscribe('produtos-por-comanda-lista', function(topico){
      this.carregaLista();
    }.bind(this));
  }

  carregaLista(){
    $.ajax({
        url:"http://localhost:8080/sgr/comandas/"+this.comandaId+"/produtos",
        dataType: 'json',
        success:function(resposta){
          this.setState({produtos:resposta});
        }.bind(this)
      }
    );
 }
}
