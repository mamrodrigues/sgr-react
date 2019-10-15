import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';

class App extends Component {

  constructor(){
    super();
    this.state = {produtos:[], nome:'', descricao:'', valor:''};
    this.cadastrar = this.cadastrar.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setDescricao = this.setDescricao.bind(this);
    this.setValor = this.setValor.bind(this);
  }

componentDidMount(){
   this.carregaLista();
 }

 carregaLista(){
   $.ajax({
       url:"http://localhost:8080/sgr/produtos",
       dataType: 'json',
       success:function(resposta){
         console.log("carregou");
         this.setState({produtos:resposta});
       }.bind(this)
     }
   );
 }

 cadastrar(syntheticEvent){
   syntheticEvent.preventDefault();

   $.ajax({
       url:"http://localhost:8080/sgr/produtos",
       dataType: 'json',
       contentType: "application/json; charset=utf-8",
       type: 'post',
       data: JSON.stringify({nome:this.state.nome, descricao:this.state.descricao, valor:this.state.valor}),
       success:function(resposta){
         console.log(resposta);
         //this.setState({produtos:resposta});
         this.carregaLista();
       }.bind(this),
       error: function(){
         console.log("error");

       }
     }
   );
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

  render(){
    return (
      <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">SGR</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Estabelecimentos</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Funcionários</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Cardápios</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Comandas</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Produtos</a></li>
                  </ul>
              </div>
          </div>

          <div id="main">
              <div className="header">
                <h3>Cadastro de Produtos</h3>
              </div>
              <div className="content" id="content">
                <div className="pure-form pure-form-aligned">
                  <form className="pure-form pure-form-aligned" onSubmit={this.cadastrar} method="post">

                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                    <InputCustomizado id="descricao" type="text" name="descricao" value={this.state.descricao} onChange={this.setDescricao} label="Descrição"/>
                    <InputCustomizado id="valor" type="text" name="valor" value={this.state.valor} onChange={this.setValor} label="Valor"/>                                            

                    <div className="pure-control-group">
                      <label></label>
                      <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                  </form>

                </div>
                <div>
                  <table className="pure-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.produtos.map(function(produto){
                          return(
                            <tr>
                              <td>{produto.nome}</td>
                              <td>{produto.descricao}</td>
                              <td>{produto.valor}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    );
  }

}

export default App;
