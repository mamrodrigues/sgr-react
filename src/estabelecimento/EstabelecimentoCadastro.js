import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';
import SelectCustomizado from '../componentes/SelectCustomizado';

export default class EstabelecimentoCadastro extends Component {

  constructor(){
    super();
    this.state = {nome:'', cnpj:'', enderecos:[], enderecoId:''};
    this.cadastrar = this.cadastrar.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setCnpj = this.setCnpj.bind(this);
    this.setEndereco = this.setEndereco.bind(this);

    $.ajax({
        url:"http://localhost:8080/sgr/enderecos",
        dataType: 'json',
        success:function(resposta){
          this.setState({enderecos:resposta});
        }.bind(this)
      }
    );
  }

  render(){
    return (
      <div className="pure-form-aligned">
        <form className="pure-form" onSubmit={this.cadastrar} method="post">

          <InputCustomizado className="pure-control-group" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
          <InputCustomizado className="pure-control-group" id="cnpj" type="text" name="cnpj" value={this.state.cnpj} onChange={this.setCnpj} label="CNPJ"/>

          <div className="pure-control-group">
              <label htmlFor="endereco">Endereço</label>

              <select name="endereco" id="endereco" onChange={this.setEndereco} >
                  {
                    this.state.enderecos.map(function(object){
                        return <option value={object.enderecoId}>{object.endereco}</option>
                    })
                  }
              </select>
          </div>

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

    if(this.state.enderecoId == ''){
      this.state.enderecoId = this.state.enderecos[0].enderecoId;
    }

    $.ajax({
        url:"http://localhost:8080/sgr/estabelecimentos",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'post',
        data: JSON.stringify(
          {nome:this.state.nome,
            cnpj:this.state.cnpj,
            endereco:{
              enderecoId: this.state.enderecoId
            }
          }),
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

  setEndereco(evento){
    console.log(evento.target.value);
    this.setState({ enderecoId: evento.target.value }, () => {
      console.log('valor', this.state.enderecoId);
    });
  }

}
