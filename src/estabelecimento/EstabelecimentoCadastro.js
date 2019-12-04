import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';
import SelectCustomizado from '../componentes/SelectCustomizado';

export default class EstabelecimentoCadastro extends Component {

  constructor(){
    super();
    this.state = {
      mensagemSucesso:'',
      estabelecimentoId:'',
      endereco:'',
      cep:'',
      numero:'',
      cidade:'',
      estado:'',
      nome:'',
      cnpj:'',
      isFormValido:false
    };

    this.cadastrar = this.cadastrar.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setCnpj = this.setCnpj.bind(this);

    this.setEndereco = this.setEndereco.bind(this);
    this.setCep = this.setCep.bind(this);
    this.setNumero = this.setNumero.bind(this);
    this.setCidade = this.setCidade.bind(this);
    this.setEstado = this.setEstado.bind(this);

    PubSub.subscribe('estabelecimento-editar', function(chave, estabelecimento){
      this.setState(
        {
          estabelecimentoId:estabelecimento.estabelecimentoId,
          endereco:estabelecimento.endereco,
          cep:estabelecimento.cep,
          numero:estabelecimento.numero,
          cidade:estabelecimento.cidade,
          estado:estabelecimento.estado,
          nome:estabelecimento.nome,
          cnpj:estabelecimento.cnpj
        }, () => {
          this.validateForm();
        });
    }.bind(this));
  }

  render(){
    return (
      <div className="pure-form-aligned">
        <form className="pure-form" onSubmit={this.cadastrar} method="post">
          <InputCustomizado id="endereco" type="text" name="endereco" value={this.state.endereco}
            onChange={this.setEndereco} label="Endereço" mensagemErro="Endereço Obrigatório"/>

          <InputCustomizado id="cep" type="text" name="cep" value={this.state.cep}
            onChange={this.setCep} label="CEP" mensagemErro="CEP Obrigatório" maxlength="10" minlength="10"/>

          <InputCustomizado id="numero" type="number" name="numero" value={this.state.numero}
            onChange={this.setNumero} label="Número" mensagemErro="Número Obrigatório" maxlength="10"/>

          <InputCustomizado id="estado" type="text" name="estado" value={this.state.estado}
            onChange={this.setEstado} label="Estado" mensagemErro="Estado Obrigatório"/>

          <InputCustomizado id="cidade" type="text" name="cidade" value={this.state.cidade}
            onChange={this.setCidade} label="Cidade" mensagemErro="Cidade Obrigatório"/>

          <InputCustomizado className="pure-control-group" id="nome" type="text" name="nome" value={this.state.nome}
            onChange={this.setNome} label="Nome" mensagemErro="Nome Obrigatório"/>

          <InputCustomizado className="pure-control-group" id="cnpj" type="text" name="cnpj" value={this.state.cnpj}
            onChange={this.setCnpj} label="CNPJ" mensagemErro="CNPJ Obrigatório" maxlength="18" minlength="18"/>

          <div className="pure-control-group">
            <label></label>
            <button disabled={!this.state.isFormValido} type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>

        <label id={this.props.id} style={{color: '#006600', fontWeight:'bold'}}>{this.state.mensagemSucesso}</label>
      </div>
    );
  }

  cadastrar(syntheticEvent){
    syntheticEvent.preventDefault();

    this.save();
  }

  save(){
    if(this.state.estabelecimentoId != ''){
      $.ajax({
          url:"http://localhost:8080/sgr/estabelecimentos",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'post',
          data: JSON.stringify(
            {
              estabelecimentoId: this.state.estabelecimentoId,
              nome:this.state.nome,
              cnpj:this.state.cnpj,
              endereco:this.state.endereco,
              cep:this.state.cep,
              numero:this.state.numero,
              cidade:this.state.cidade,
              estado:this.state.estado
            }),
          success:function(estabelecimento){
            this.setState(
              {
                estabelecimentoId:'',
                nome:'',
                cnpj:'',
                endereco:'',
                cep:'',
                numero:'',
                cidade:'',
                estado:'',
                mensagemSucesso:'ESTABELECIMENTO ATUALIZADO COM SUCESSO'
              }
            );

            PubSub.publish('estabelecimento-lista');
          }.bind(this),
          error: function(error){
            console.log(error);
          }
        }
      );

    } else {

      $.ajax({
          url:"http://localhost:8080/sgr/estabelecimentos",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'post',
          data: JSON.stringify(
            {
              nome:this.state.nome,
              cnpj:this.state.cnpj,
              endereco:this.state.endereco,
              cep:this.state.cep,
              numero:this.state.numero,
              cidade:this.state.cidade,
              estado:this.state.estado
            }),
          success:function(estabelecimento){
            this.setState(
              {
                estabelecimentoId:'',
                nome:'',
                cnpj:'',
                endereco:'',
                cep:'',
                numero:'',
                cidade:'',
                estado:'',
                mensagemSucesso:'ESTABELECIMENTO CADASTRADO COM SUCESSO'
              }
            );

            PubSub.publish('estabelecimento-lista');
          }.bind(this),
          error: function(error){
            console.log(error);
          }
        }
      );
    }
  }

  setEndereco(evento){
    this.setState({endereco:evento.target.value}, () => {
      this.validateForm();
    });
  }

  setNumero(evento){
    this.setState({numero:evento.target.value}, () => {
      this.validateForm();
    });
  }

  setCidade(evento){
    this.setState({cidade:evento.target.value}, () => {
      this.validateForm();
    });
  }

  setEstado(evento){
    this.setState({estado:evento.target.value}, () => {
      this.validateForm();
    });
  }

  setNome(evento){
    this.setState({nome:evento.target.value}, () => {
      this.validateForm();
    });
  }

  setCnpj(evento){
    this.validaCNPJ(evento.target.value);
  }

  setCep(evento){
    this.validaCep(evento.target.value);
  }

  validaCNPJ(cnpj){
    var value = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1 $2 $3/$4-$5");
    this.setState({cnpj:value}, () => {
      this.validateForm();
    });
  }

  validaCep(cep){
    var value = cep.replace(/^(\d{2})(\d{3})(\d{3})/, "$1.$2-$3");
    this.setState({cep:value}, () => {
      this.validateForm();
    });
  }

  validateForm(){
    if (this.state.nome && this.state.nome.length > 3 &&
      this.state.cnpj && this.state.cnpj.length === 18 &&
      this.state.endereco && this.state.endereco.length > 0 &&
      this.state.cep && this.state.cep.length === 10 &&
      this.state.numero && this.state.numero != 0 &&
      this.state.cidade && this.state.cidade.length > 0 &&
      this.state.estado) {

        this.setState({isFormValido:true}, () => {
          console.log('isFormValido', this.state.isFormValido);
        });

    } else {
      this.setState({isFormValido:false}, () => {
        console.log('isFormValido', this.state.isFormValido);
      });
    }
  }

}
