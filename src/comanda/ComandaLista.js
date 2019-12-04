import React, {Component} from 'react';

export default class ComandaLista extends Component {

  constructor(){
    super();
    this.state = {comandas:[]};
  }

  render(){
    return(
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.comandas.map(function(comanda){
                return(
                  <tr>
                    <td>{comanda.nome}</td>
                    <td><a href={"/produtosPorComanda/"+comanda.comandaId}>Listar Produtos da Comanda</a></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

}
