import { Component } from '@angular/core';
import { BlockInfo } from './models/block-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlockDispersionApp';

  public blocksNumber: number;
  public coefficient: number;
  public sum: number;

  public onBlockClicked = (blockInfo: BlockInfo) => {
    window.alert(`Block value is ${blockInfo.value} and index is ${blockInfo.index}`)
  }
}
