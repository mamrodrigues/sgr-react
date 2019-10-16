import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';

export default class ProdutoCadastro extends Component {

  constructor(){
    super();
    this.state = {nome:'', descricao:'', valor:''};
    this.cadastrar = this.cadastrar.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setDescricao = this.setDescricao.bind(this);
    this.setValor = this.setValor.bind(this);
  }

  render(){
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.cadastrar} method="post">

          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
          <InputCustomizado id="descricao" type="text" name="descricao" value={this.state.descricao} onChange={this.setDescricao} label="Descrição"/>
          <InputCustomizado id="valor" type="text" name="valor" value={this.state.valor} onChange={this.setValor} label="Valor"/>

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
        url:"http://localhost:8080/sgr/produtos",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'post',
        data: JSON.stringify({nome:this.state.nome, descricao:this.state.descricao, valor:this.state.valor}),
        success:function(resposta){
          this.setState({nome:'', descricao:'', valor:''});
          PubSub.publish('produto-lista');
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

  setValor(evento){
    this.setState({valor:evento.target.value});
  }

}
