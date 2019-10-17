import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';

export default class FuncionarioCadastro extends Component {

  constructor(){
    super();
    this.state = {nome:'', cpf:'', dataNascimento:''};
    this.cadastrar = this.cadastrar.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setCpf = this.setCpf.bind(this);
    this.setDataNascimento = this.setDataNascimento.bind(this);
  }

  render(){
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.cadastrar} method="post">

          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
          <InputCustomizado id="cpf" type="text" name="cpf" value={this.state.cpf} onChange={this.setCpf} label="CPF"/>
          <InputCustomizado id="dataNascimento" type="date" name="dataNascimento" value={this.state.dataNascimento} onChange={this.setDataNascimento} label="Data de Nascimento"/>

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
        url:"http://localhost:8080/sgr/funcionarios",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'post',
        data: JSON.stringify({nome:this.state.nome, cpf:this.state.cpf}),
        success:function(resposta){
          this.setState({nome:'', cpf:'', dataNascimento:''});
          PubSub.publish('funcionario-lista');
        }.bind(this),
        error: function(error){
          console.log(error);
        }
      }
    );
  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }

  setCpf(evento){
    this.setState({cpf:evento.target.value});
  }

  setDataNascimento(evento){
    this.setState({dataNascimento:evento.target.value});
  }

}
