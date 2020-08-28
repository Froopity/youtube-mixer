import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-crossfade-buttons',
  templateUrl: './crossfade-buttons.component.html',
  styleUrls: ['./crossfade-buttons.component.scss']
})
export class CrossfadeButtonsComponent implements OnInit {

  @Input()
  readonly crossfade: (over: number) => void;

  @Input()
  readonly durations = [5, 10, 30, 60];

  selectedDuration: number;

  constructor() {
    this.selectedDuration = this.durations[0];
  }

  ngOnInit(): void {
  }

  click(duration: number): void {
    this.selectedDuration = duration;
  }

  isSelected(duration: number): boolean {
    return duration === this.selectedDuration;
  }

  fade(): void {
    this.crossfade(this.selectedDuration);
  }
}
