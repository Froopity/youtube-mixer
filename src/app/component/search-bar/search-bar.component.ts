import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  readonly searchbar: FormGroup;
  private readonly vidID: AbstractControl;

  constructor(formBuilder: FormBuilder) {
    this.searchbar = formBuilder.group({
      vidID: ''
    });
    this.vidID = this.searchbar.get('vidID');
   }

  ngOnInit(): void {
  }

  leftTrig(): void {
    console.log('left!!!');
  }

  rightTrig(): void {
    console.log('right!!!');
  }

}
