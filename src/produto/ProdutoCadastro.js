import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';
import SelectCustomizado from '../componentes/SelectCustomizado';

export default class ProdutoCadastro extends Component {

  constructor(){
    super();
    this.state = {mensagemSucesso:'', produtoId:'', nome:'', descricao:'', valor:'', cardapios:[], cardapioId:''};
    this.cadastrar = this.cadastrar.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setDescricao = this.setDescricao.bind(this);
    this.setValor = this.setValor.bind(this);
    this.setCardapio = this.setCardapio.bind(this);

    $.ajax({
        url:"http://localhost:8080/sgr/cardapios",
        dataType: 'json',
        success:function(resposta){
          this.setState({cardapios:resposta});
        }.bind(this)
      }
    );

    PubSub.subscribe('produto-editar', function(chave, produto){
      this.setState(
        {
          produtoId:produto.produtoId,
          nome:produto.nome,
          descricao:produto.descricao,
          valor:produto.valor
        });
    }.bind(this));
  }

  render(){
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.cadastrar} method="post">

          <InputCustomizado
              id="nome" type="text" name="nome" value={this.state.nome}
              onChange={this.setNome} label="Nome" mensagemErro="Nome Obrigatório"/>

          <InputCustomizado
              id="descricao" type="text" name="descricao" value={this.state.descricao}
              onChange={this.setDescricao} label="Descrição" mensagemErro="Descrição Obrigatório"/>

          <InputCustomizado
              id="valor" type="text" name="valor" value={this.state.valor}
              onChange={this.setValor} label="Valor" mensagemErro="Valor Obrigatório"/>

          <div className="pure-control-group">
              <label htmlFor="cardapio">Cardápio</label>

              <select name="cardapio" id="cardapio" onChange={this.setCardapio} >
                  {
                    this.state.cardapios.map(function(object){
                        return <option value={object.cardapioId}>{object.nome}</option>
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

    if(this.state.cardapioId == ''){
      this.state.cardapioId = this.state.cardapios[0].cardapioId;
    }

    if(this.state.produtoId != ''){

      $.ajax({
          url:"http://localhost:8080/sgr/produtos",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'post',
          data: JSON.stringify(
            {
              produtoId: this.state.produtoId,
              nome:this.state.nome,
              descricao:this.state.descricao,
              valor:this.state.valor,
              cardapio:{
                cardapioId: this.state.cardapioId
              }
            }),
          success:function(resposta){
            this.setState({
              nome:'',
              descricao:'',
              valor:'',
              mensagemSucesso:'PRODUTO ATUALIZADO COM SUCESSO'
            });

            PubSub.publish('produto-lista');
          }.bind(this),
          error: function(){
            console.log("error");
          }
        }
      );

    } else {
      $.ajax({
          url:"http://localhost:8080/sgr/produtos",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'post',
          data: JSON.stringify(
            {
              nome:this.state.nome,
              descricao:this.state.descricao,
              valor:this.state.valor,
              cardapio:{
                cardapioId: this.state.cardapioId
              }
            }),
          success:function(resposta){
            this.setState({
              nome:'',
              descricao:'',
              valor:'',
              mensagemSucesso:'PRODUTO CADASTRADO COM SUCESSO'
            });

            PubSub.publish('produto-lista');
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

  setValor(evento){
    this.setState({valor:evento.target.value});
  }

  setCardapio(evento){
    this.setState({ cardapioId: evento.target.value }, () => {
      console.log('cardapioId', this.state.cardapioId);
    });
  }

}
