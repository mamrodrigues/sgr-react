import React, {Component} from 'react';
import EnderecoCadastro from './EnderecoCadastro';
import EnderecoLista from './EnderecoLista';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class EnderecoBox extends Component {
  constructor(){
    super();
    this.state = {enderecos:[]};
  }

  render(){
    return (
      <div>
        <div className="header">
          <h3>Cadastro de Endereço</h3>
        </div>

        <EnderecoCadastro/>
        {
          (typeof this.state.enderecos !== 'undefined' && this.state.enderecos.length != 0) ? <EnderecoLista enderecos={this.state.enderecos}/> : null
        }

      </div>
    );
  }

  componentDidMount(){
     this.carregaLista();
     PubSub.subscribe('endereco-lista', function(topico){
       this.carregaLista();
     }.bind(this));
  }

  carregaLista(){
    $.ajax({
        url:"http://localhost:8080/sgr/enderecos",
        dataType: 'json',
        success:function(resposta){
          this.setState({enderecos:resposta});
        }.bind(this)
      }
    );
 }
}
