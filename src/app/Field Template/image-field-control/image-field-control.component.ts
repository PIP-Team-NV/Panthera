import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'fcid-image-field-control',
  templateUrl: './image-field-control.component.html',
  styleUrls: ['./image-field-control.component.css']
})
export class ImageFieldControlComponent implements OnInit {

  @Input('value')
  value: boolean;
  image0?: string;
  image1?: string;
  Image0ToolTip?: string;
  Image1ToolTip?: string;
  width?: number;
  height?: number;

  constructor() {
  }
  public ngOnInit(): void {

  }

  Condition(image: string, condition: boolean) {
    return (condition ? this.value : !this.value) && (image);
  }
}