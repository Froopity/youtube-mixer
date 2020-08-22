import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-crossfade-buttons',
  templateUrl: './crossfade-buttons.component.html',
  styleUrls: ['./crossfade-buttons.component.css']
})
export class CrossfadeButtonsComponent implements OnInit {

  @Input()
  readonly func: (over: number) => void;

  constructor() { }

  ngOnInit(): void {
  }

}
