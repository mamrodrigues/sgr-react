import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';

export default class EstabelecimentoCadastro extends Component {

  constructor(){
    super();
    this.state = {nome:'', cnpj:''};
    this.cadastrar = this.cadastrar.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setCnpj = this.setCnpj.bind(this);
  }

  render(){
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.cadastrar} method="post">

          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
          <InputCustomizado id="cnpj" type="text" name="cnpj" value={this.state.cnpj} onChange={this.setCnpj} label="CNPJ"/>

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
        url:"http://localhost:8080/sgr/estabelecimentos",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'post',
        data: JSON.stringify({nome:this.state.nome, cnpj:this.state.cnpj}),
        success:function(resposta){
          this.setState({nome:'', cnpj:''});
          PubSub.publish('estabelecimento-lista');
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

  setCnpj(evento){
    this.setState({cnpj:evento.target.value});
  }

}
