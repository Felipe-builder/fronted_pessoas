import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'person-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: any[] = [
    {id: 1, name: 'teste'},
    {id: 2, name: 'teste 2'}
  ];

  displayedColumns = ['id', 'name'];

  ngOnInit() {
    console.log(this.paginator);
  }

  paginaTrocada(pagina: any) {
    console.log(pagina);
  }

}
