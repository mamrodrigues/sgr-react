import React, {Component} from 'react';
import FuncionarioCadastro from './FuncionarioCadastro';
import FuncionarioLista from './FuncionarioLista';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class FuncionarioBox extends Component {
  constructor(){
    super();
    this.state = {funcionarios:[]};
  }

  render(){
    return (
      <div>
        <div className="header">
          <h3>Cadastro de Funcionários</h3>
        </div>

        <FuncionarioCadastro/>
        {
          (typeof this.state.funcionarios !== 'undefined' && this.state.funcionarios.length != 0) ? <FuncionarioLista funcionarios={this.state.funcionarios}/> : null
        }


      </div>
    );
  }

  componentDidMount(){
     this.carregaLista();
     PubSub.subscribe('funcionario-lista', function(topico){
       this.carregaLista();
     }.bind(this));
  }

  carregaLista(){
    $.ajax({
        url:"http://localhost:8080/sgr/funcionarios",
        dataType: 'json',
        success:function(resposta){
          this.setState({funcionarios:resposta});
        }.bind(this)
      }
    );
 }
}
