import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';

export default class EnderecoCadastro extends Component {

  constructor(){
    super();
    this.state = {endereco:'', cep:'', numero:'', cidade:'', estado:''};
    this.cadastrar = this.cadastrar.bind(this);
    this.setEndereco = this.setEndereco.bind(this);
    this.setCep = this.setCep.bind(this);
    this.setNumero = this.setNumero.bind(this);
    this.setCidade = this.setCidade.bind(this);
    this.setEstado = this.setEstado.bind(this);
  }

  render(){
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.cadastrar} method="post">

          <InputCustomizado id="endereco" type="text" name="endereco" value={this.state.endereco} onChange={this.setEndereco} label="Endereço"/>
          <InputCustomizado id="cep" type="text" name="cep" value={this.state.cep} onChange={this.setCep} label="CEP"/>
          <InputCustomizado id="numero" type="text" name="numero" value={this.state.numero} onChange={this.setNumero} label="Número"/>
          <InputCustomizado id="estado" type="text" name="estado" value={this.state.estado} onChange={this.setEstado} label="Estado"/>
          <InputCustomizado id="cidade" type="text" name="cidade" value={this.state.cidade} onChange={this.setCidade} label="Cidade"/>

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
        url:"http://localhost:8080/sgr/enderecos",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'post',
        data: JSON.stringify({endereco:this.state.endereco, cep:this.state.cep, numero:this.state.numero, cidade:this.state.cidade, estado:this.state.estado}),
        success:function(resposta){
          this.setState({endereco:'', cep:'', numero:'', cidade:'', estado:''});
          PubSub.publish('endereco-lista');
        }.bind(this),
        error: function(error){
          console.log(error);
        }
      }
    );
  }

  setEndereco(evento){
    this.setState({endereco:evento.target.value});
  }

  setCep(evento){
    this.setState({cep:evento.target.value});
  }

  setNumero(evento){
    this.setState({numero:evento.target.value});
  }

  setCidade(evento){
    this.setState({cidade:evento.target.value});
  }

  setEstado(evento){
    this.setState({estado:evento.target.value});
  }
}
