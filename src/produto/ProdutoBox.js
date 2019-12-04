import React, {Component} from 'react';
import ProdutoCadastro from './ProdutoCadastro';
import ProdutoLista from './ProdutoLista';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class ProdutoBox extends Component {
  constructor(){
    super();
    this.state = {produtos:[]};


  }

  render(){
    return (
      <div>
        <div className="header">
          <h3>Cadastro de Produtos</h3>
        </div>

        <ProdutoCadastro/>
        {
          (typeof this.state.produtos !== 'undefined' && this.state.produtos.length != 0) ? <ProdutoLista produtos={this.state.produtos}/> : null
        }

      </div>
    );
  }

  componentDidMount(){
     this.carregaLista();
     PubSub.subscribe('produto-lista', function(topico){
       this.carregaLista();
     }.bind(this));
  }

  carregaLista(){
    $.ajax({
        url:"http://localhost:8080/sgr/produtos",
        dataType: 'json',
        success:function(resposta){
          this.setState({produtos:resposta});
        }.bind(this)
      }
    );
 }
}
