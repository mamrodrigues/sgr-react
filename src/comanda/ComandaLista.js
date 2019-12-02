import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class ComandaLista extends Component {

  constructor(){
    super();
    this.state = {comandas:[]};

    this.detalharComanda = this.detalharComanda.bind(this);
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.comandas.map(function(comanda){
                return(
                  <tr>
                    <td>{comanda.nome}</td>

                    <td><a href={"/produtosPorComanda/"+comanda.id}>Listar Produtos da Comanda</a></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  detalharComanda(param){
    window.alert(param)
    // $.ajax({
    //     url:"http://localhost:8080/sgr/comandas/",
    //     dataType: 'json',
    //     success:function(resposta){
    //       this.setState({estabelecimentos:resposta});
    //     }.bind(this)
    //   }
    // );
 }

}
