import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import InputCustomizado from '../componentes/InputCustomizado';

export default class ComandaCadastro extends Component {

  constructor(){
    super();
    this.state = {comandaId:'', nome:'', cardapios:[], produtos:[]};
    this.cadastrar = this.cadastrar.bind(this);

    this.setNome = this.setNome.bind(this);

    $.ajax({
        url:"http://localhost:8080/sgr/cardapios",
        dataType: 'json',
        success:function(resposta){
          this.setState({cardapios:resposta});
        }.bind(this)
      }
    );

    PubSub.subscribe('comanda-editar', function(chave, comanda){
      console.log('comanda', comanda);
      this.setState(
        {
          comandaId:comanda.comandaId,
          nome:comanda.nome
        }, () => {
          this.validateForm();
        });
    }.bind(this));
  }

  render(){
    return (
      <div className="pure-form-aligned">
        <form className="pure-form" onSubmit={this.cadastrar} method="post">

          <InputCustomizado className="pure-control-group" id="nome" type="text"
            name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"
            minlength="5" maxlength="20"/>

          <div className="pure-control-group">
            <label></label>
            <button disabled={!this.state.isFormValido} type="submit" className="pure-button pure-button-primary">Abrir Comanda</button>
          </div>
        </form>

      </div>
    );
  }

  cadastrar(syntheticEvent){
    syntheticEvent.preventDefault();

    if(this.state.comandaId != ''){
      $.ajax({
          url:"http://localhost:8080/sgr/comandas",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'post',
          data: JSON.stringify(
            {
              comandaId:this.state.comandaId,
              nome:this.state.nome,
              produtoId:this.state.produto
            }
          ),
          success:function(resposta){
            this.setState({
              comandaId:'',
              nome:'',
              cnpj:''
            });
            PubSub.publish('comanda-lista');
          }.bind(this),
          error: function(error){
            console.log(error);
          }
        }
      );

    } else {
      $.ajax({
          url:"http://localhost:8080/sgr/comandas",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          type: 'post',
          data: JSON.stringify(
            {
              nome:this.state.nome,
              produtoId:this.state.produto
            }
          ),
          success:function(resposta){
            this.setState({
              comandaId:'',
              nome:'',
              cnpj:''
            });
            PubSub.publish('comanda-lista');
          }.bind(this),
          error: function(error){
            console.log(error);
          }
        }
      );
    }

  }

  setNome(evento){
    this.setState({nome:evento.target.value}, () =>{
      this.validateForm();
    });
  }

  validateForm(){
    if (this.state.nome && this.state.nome.length > 5) {
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
