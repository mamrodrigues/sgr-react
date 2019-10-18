import React, {Component} from 'react';
import EstabelecimentoCadastro from './EstabelecimentoCadastro';
import EstabelecimentoLista from './EstabelecimentoLista';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class EstabelecimentoBox extends Component {
  constructor(){
    super();
    this.state = {estabelecimentos:[]};
  }

  render(){
    return (
      <div>
        <div className="header">
          <h3>Cadastro de Estabelecimento</h3>
        </div>

        <EstabelecimentoCadastro/>
        <EstabelecimentoLista estabelecimentos={this.state.estabelecimentos}/>
      </div>
    );
  }

  componentDidMount(){
     this.carregaLista();
     PubSub.subscribe('estabelecimento-lista', function(topico){
       this.carregaLista();
     }.bind(this));
  }

  carregaLista(){
    $.ajax({
        url:"http://localhost:8080/sgr/estabelecimentos",
        dataType: 'json',
        success:function(resposta){
          this.setState({estabelecimentos:resposta});
        }.bind(this)
      }
    );
 }
}
