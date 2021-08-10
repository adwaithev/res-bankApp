import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  

transactions:any

  constructor(public ds:DataService) { 
    
    this.transactions=this.ds.getTransaction()
    
 
    
  }

  ngOnInit(): void {
  }

}
