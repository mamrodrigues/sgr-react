import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';
import SelectCustomizado from '../componentes/SelectCustomizado';

export default class CardapioCadastro extends Component {

  constructor(){
    super();
    this.state = {mensagemSucesso:'', cardapioId:'', nome:'', descricao:'', estabelecimentos:[], estabelecimentoId:''};
    this.cadastrar = this.cadastrar.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setDescricao = this.setDescricao.bind(this);
    this.setEstabelecimento = this.setEstabelecimento.bind(this);

    $.ajax({
        url:"http://localhost:8080/sgr/estabelecimentos",
        dataType: 'json',
        success:function(resposta){
          this.setState({estabelecimentos:resposta});
        }.bind(this)
      }
    );

    PubSub.subscribe('cardapio-editar', function(chave, cardapio){
      this.setState(
        {
          cardapioId:cardapio.cardapioId,
          nome:cardapio.nome,
          descricao:cardapio.descricao
        });
    }.bind(this));
  }

  render(){
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.cadastrar} method="post">

          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome}
            onChange={this.setNome} label="Nome" mensagemErro="Nome Obrigatório"/>

          <InputCustomizado id="descricao" type="text" name="descricao" value={this.state.descricao}
            onChange={this.setDescricao} label="Descrição" mensagemErro="Descrição Obrigatório"/>

          <div className="pure-control-group">
              <label htmlFor="estabelecimento">Estabelecimento</label>

              <select name="estabelecimento" id="estabelecimento" onChange={this.setEstabelecimento} >
                  {
                    this.state.estabelecimentos.map(function(object){
                        return <option value={object.estabelecimentoId}>{object.nome}</option>
                    })
                  }
              </select>
          </div>

          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>

        <label id={this.props.id} style={{color: '#006600', fontWeight:'bold'}}>{this.state.mensagemSucesso}</label>
      </div>
    );
  }

  cadastrar(syntheticEvent){
    syntheticEvent.preventDefault();

    if(this.state.estabelecimentoId == ''){
      this.state.estabelecimentoId = this.state.estabelecimentos[0].estabelecimentoId;
    }

    if(this.state.cardapioId != ''){

      $.ajax({
          url:"http://localhost:8080/sgr/cardapios",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'post',
          data: JSON.stringify({
            cardapioId: this.state.cardapioId,
            nome:this.state.nome,
            descricao:this.state.descricao,
            estabelecimento: {
              estabelecimentoId: this.state.estabelecimentoId
            }
          }),
          success:function(resposta){
            this.setState({
                nome:'',
                descricao:'',
                mensagemSucesso:'CARDÁPIO ATUALIZADO COM SUCESSO'
              });

            PubSub.publish('cardapio-lista');
          }.bind(this),
          error: function(){
            console.log("error");
          }
        }
      );

    } else {

      $.ajax({
          url:"http://localhost:8080/sgr/cardapios",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'post',
          data: JSON.stringify({
            nome:this.state.nome,
            descricao:this.state.descricao,
            estabelecimento: {
              estabelecimentoId: this.state.estabelecimentoId
            }
          }),
          success:function(resposta){
            this.setState({
              nome:'',
              descricao:'',
              mensagemSucesso:'CARDÁPIO CADASTRADO COM SUCESSO'
            });

            PubSub.publish('cardapio-lista');
          }.bind(this),
          error: function(){
            console.log("error");
          }
        }
      );
    }


  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }

  setDescricao(evento){
    this.setState({descricao:evento.target.value});
  }

  setEstabelecimento(evento){
    this.setState({ estabelecimentoId: evento.target.value }, () => {
      console.log('estabelecimentoId', this.state.estabelecimentoId);
    });
  }

}
