import React, {Component} from 'react';
import ComandaCadastro from './ComandaCadastro';
import ComandaLista from './ComandaLista';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class ComandaBox extends Component {
  constructor(){
    super();
    this.state = {comandas:[]};
  }

  render(){
    return (
      <div>
        <div className="header">
          <h3>Cadastro de Comandas</h3>
        </div>

        <ComandaCadastro/>
        {
          (typeof this.state.comandas !== 'undefined' && this.state.comandas.length != 0) ? <ComandaLista comandas={this.state.comandas}/> : null
        }

      </div>
    );
  }

  componentDidMount(){
     this.carregaLista();
     PubSub.subscribe('comanda-lista', function(topico){
       this.carregaLista();
     }.bind(this));
  }

  carregaLista(){
    $.ajax({
        url:"http://localhost:8080/sgr/comandas",
        dataType: 'json',
        success:function(resposta){
          this.setState({comandas:resposta});
        }.bind(this)
      }
    );
 }
}
