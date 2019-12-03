import React, {Component} from 'react';
import EstabelecimentoCadastro from './EstabelecimentoCadastro';
import ErroCustomizado from '../componentes/ErroCustomizado';
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
        {
          (typeof this.state.estabelecimentos !== 'undefined' && this.state.estabelecimentos.length != 0) ? <EstabelecimentoLista estabelecimentos={this.state.estabelecimentos}/> : null
        }

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
