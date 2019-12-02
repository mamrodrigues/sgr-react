import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';
import SelectCustomizado from '../componentes/SelectCustomizado';

export default class PedidoCadastro extends Component {

  constructor(){
    super();
    this.state = {nome:'', cardapios:[], produtosCardapio:[], cardapioId:'', produtoId:''};
    this.cadastrar = this.cadastrar.bind(this);

    this.setCardapio = this.setCardapio.bind(this);
    this.setProduto = this.setProduto.bind(this);

    $.ajax({
        url:"http://localhost:8080/sgr/cardapios",
        dataType: 'json',
        success:function(resposta){
          this.setState({cardapios:resposta});

          $.ajax({
              url:"http://localhost:8080/sgr/cardapios/"+this.state.cardapios[0].cardapioId+"/produtos",
              dataType: 'json',
              success:function(resposta){
                this.setState({produtosCardapio:resposta});
              }.bind(this)
          });

        }.bind(this)
    });

  }

  render(){
    return (
      <div className="pure-form-aligned">
        <form className="pure-form" onSubmit={this.cadastrar} method="post">

        <div className="pure-control-group">
            <label htmlFor="cardapio">Cardapio</label>

            <select name="cardapio" id="cardapio" onChange={this.setCardapio}>
                {
                  this.state.cardapios.map(function(object){
                      return <option value={object.cardapioId}>{object.nome}</option>
                  })
                }
            </select>
        </div>

        <div className="pure-control-group">
            <label htmlFor="produto">Produto</label>

            <select name="produto" id="produto" onChange={this.setProduto}>
                {
                  this.state.produtosCardapio.map(function(object){
                      return <option value={object.produtoId}>{object.nome}</option>
                  })
                }
            </select>
        </div>

          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Realizar Pedido</button>
          </div>
        </form>

      </div>
    );
  }

  //TODO Fazer o cadastro do pedido
  cadastrar(syntheticEvent){
    syntheticEvent.preventDefault();

    if(this.state.cardapioId == ''){
      this.state.cardapioId = this.state.cardapios[0].cardapioId;
    }

    if(this.state.produtoId == ''){
      this.state.produtoId = this.state.produtosCardapio[0].produtoId;
    }

    console.log(this.state.cardapioId);
    console.log(this.state.produtoId);

    // $.ajax({
    //     url:"http://localhost:8080/sgr/comandas",
    //     dataType: 'json',
    //     contentType: "application/json; charset=utf-8",
    //     type: 'post',
    //     data: JSON.stringify({nome:this.state.nome, produtoId:this.state.produto}),
    //     success:function(resposta){
    //       this.setState({nome:'', cnpj:''});
    //       PubSub.publish('produtos-por-comanda-lista');
    //     }.bind(this),
    //     error: function(error){
    //       console.log(error);
    //     }
    //   }
    // );
  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }

  setCardapio(evento){
    let value = evento.target.value;
    this.setState({cardapioId:value});

    $.ajax({
        url:"http://localhost:8080/sgr/cardapios/"+value+"/produtos",
        dataType: 'json',
        success:function(resposta){
          this.setState({produtosCardapio:resposta});
        }.bind(this)
      }
    );
  }

  setProduto(evento){
    this.setState({ produtoId: evento.target.value }, () => {
      console.log('produtoId', this.state.produtoId);
    });
  }

}