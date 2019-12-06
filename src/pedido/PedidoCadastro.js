import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';
import SelectCustomizado from '../componentes/SelectCustomizado';

export default class PedidoCadastro extends Component {

  constructor(props){
    super(props);
    this.state = {nome:'', cardapios:[], observacao:'', produtosCardapio:[], cardapioId:'', produtoId:''};
    this.cadastrar = this.cadastrar.bind(this);

    this.setCardapio = this.setCardapio.bind(this);
    this.setProduto = this.setProduto.bind(this);
    this.setObservacao = this.setObservacao.bind(this);

    $.ajax({
        url:"http://localhost:8080/sgr/cardapios",
        dataType: 'json',
        success:function(resposta){
          this.setState({ cardapios: resposta }, () => {
            $.ajax({
                url:"http://localhost:8080/sgr/cardapios/"+this.state.cardapios[0].cardapioId+"/produtos",
                dataType: 'json',
                success:function(resposta){
                  this.setState({produtosCardapio:resposta});
                }.bind(this)
            });
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

        <InputCustomizado className="pure-control-group" id="observacao" type="text" name="observacao" value={this.state.observacao}
          onChange={this.setObservacao} label="Observação"/>

          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Realizar Pedido</button>
          </div>
        </form>

      </div>
    );
  }

  cadastrar(syntheticEvent){
    syntheticEvent.preventDefault();

    if(this.state.cardapioId == ''){
      this.state.cardapioId = this.state.cardapios[0].cardapioId;
    }

    if(this.state.produtoId == ''){
      this.state.produtoId = this.state.produtosCardapio[0].produtoId;
    }

    console.log("cardapioId", this.state.cardapioId);
    console.log("produtoId", this.state.produtoId);
    console.log("comandaId", this.state.comandaId);

    $.ajax({
        url:"http://localhost:8080/sgr/pedidos/",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'post',
        data: JSON.stringify({
          comanda:{
            comandaId: this.state.comandaId
          },
          produto:{
            produtoId: this.state.produtoId
          },
          observacao: this.state.observacao
        }),
        success:function(resposta){
          this.setState({nome:'', cnpj:''});
          
          PubSub.publish('produtos-por-comanda-lista');
        }.bind(this),
        error: function(error){
          console.log(error);
        }
      }
    );
  }

  setObservacao(evento){
    this.setState({observacao:evento.target.value}, () => {
    });
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

  componentDidMount(){
    this.setState({ comandaId: this.props.comandaId }, () => {
      console.log('comandaId', this.state.comandaId);
    });
  }

  setProduto(evento){
    this.setState({ produtoId: evento.target.value }, () => {
      console.log('produtoId', this.state.produtoId);
    });
  }

}
