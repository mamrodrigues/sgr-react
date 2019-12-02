import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';
import SelectCustomizado from '../componentes/SelectCustomizado';

export default class ComandaCadastro extends Component {

  constructor(){
    super();
    this.state = {nome:'', cardapios:[], produtos:[]};
    this.cadastrar = this.cadastrar.bind(this);

    this.setNome = this.setNome.bind(this);
    // this.setCardapio = this.setCardapio.bind(this);
    // this.setProduto = this.setProduto.bind(this);

    $.ajax({
        url:"http://localhost:8080/sgr/cardapios",
        dataType: 'json',
        success:function(resposta){
          this.setState({cardapios:resposta});
        }.bind(this)
      }
    );
  }

  render(){
    // <div className="pure-control-group">
    //     <label htmlFor="cardapio">cardapios</label>
    //
    //     <select name="cardapio" id="cardapio" onChange={this.setCardapio}>
    //         {
    //           this.state.cardapios.map(function(object){
    //               return <option value={object.id}>{object.cardapio}</option>
    //           })
    //         }
    //     </select>
    // </div>
    //
    // <div className="pure-control-group">
    //     <label htmlFor="produto">Produto</label>
    //
    //     <select name="produto" id="produto" onChange={this.setProduto}>
    //         {
    //           this.state.produtos.map(function(object){
    //               return <option value={object.id}>{object.produto}</option>
    //           })
    //         }
    //     </select>
    // </div>
    return (
      <div className="pure-form-aligned">
        <form className="pure-form" onSubmit={this.cadastrar} method="post">

          <InputCustomizado className="pure-control-group" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>

          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Abrir Comanda</button>
          </div>
        </form>

      </div>
    );
  }

  cadastrar(syntheticEvent){
    syntheticEvent.preventDefault();

    $.ajax({
        url:"http://localhost:8080/sgr/comandas",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'post',
        data: JSON.stringify({nome:this.state.nome, produtoId:this.state.produto}),
        success:function(resposta){
          this.setState({nome:'', cnpj:''});
          PubSub.publish('comanda-lista');
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

  // setCardapio(evento){
  //   this.setState({cardapioId:evento.target.value});
  //
  //   $.ajax({
  //       url:"http://localhost:8080/sgr/produtos"+this.state.cardapioId,
  //       dataType: 'json',
  //       success:function(resposta){
  //         this.setState({produtos:resposta});
  //       }.bind(this)
  //     }
  //   );
  // }
  //
  // setProduto(evento){
  //   this.setState({enderecoId:evento.target.value});
  // }

}
