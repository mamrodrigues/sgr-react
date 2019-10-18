import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';

export default class CardapioCadastro extends Component {

  constructor(){
    super();
    this.state = {nome:'', descricao:''};
    this.cadastrar = this.cadastrar.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setDescricao = this.setDescricao.bind(this);
  }

  render(){
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.cadastrar} method="post">

          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
          <InputCustomizado id="descricao" type="text" name="descricao" value={this.state.descricao} onChange={this.setDescricao} label="Descrição"/>

          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>

      </div>
    );
  }

  cadastrar(syntheticEvent){
    syntheticEvent.preventDefault();

    $.ajax({
        url:"http://localhost:8080/sgr/cardapios",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'post',
        data: JSON.stringify({nome:this.state.nome, descricao:this.state.descricao}),
        success:function(resposta){
          this.setState({nome:'', descricao:''});
          PubSub.publish('cardapio-lista');
        }.bind(this),
        error: function(){
          console.log("error");
        }
      }
    );
  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }

  setDescricao(evento){
    this.setState({descricao:evento.target.value});
  }

}
