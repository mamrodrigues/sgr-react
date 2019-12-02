import React, {Component} from 'react';
import CardapioCadastro from './CardapioCadastro';
import CardapioLista from './CardapioLista';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class CardapioBox extends Component {
  constructor(){
    super();
    this.state = {cardapios:[]};
  }

  render(){
    return (
      <div>
        <div className="header">
          <h3>Cadastro de Cardápios</h3>
        </div>

        <CardapioCadastro/>
        {
          (typeof this.state.cardapios !== 'undefined' && this.state.cardapios.length != 0) ? <CardapioLista cardapios={this.state.cardapios}/> : null
        }

      </div>
    );
  }

  componentDidMount(){
     this.carregaLista();
     PubSub.subscribe('cardapio-lista', function(topico){
       this.carregaLista();
     }.bind(this));
  }

  carregaLista(){
    $.ajax({
        url:"http://localhost:8080/sgr/cardapios",
        dataType: 'json',
        success:function(resposta){
          this.setState({cardapios:resposta});
        }.bind(this)
      }
    );
 }
}
