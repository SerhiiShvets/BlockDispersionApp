import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockInfo } from '../models/block-info';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  _sum: number;
  _calculatingBlocks: number;
  _coefficient: number;

  @Input() set sum(sum: number) {
    this.clearBlocks();
    if (sum < 1) {

      return;
    }
    this._sum = sum;
    this.calculateBlockDispersion();
  };

  @Input() set blocksNumber(number: number) {
    this.clearBlocks();
    if (number < 1) {

      return;
    }
    this._calculatingBlocks = number - 1;
    this.calculateBlockDispersion();
  };

  @Input() set coefficient(coefficient: number) {
    this.clearBlocks();
    if (coefficient < 1) {

      return;
    }
    this._coefficient = coefficient;
    this.calculateBlockDispersion();
  };

  @Output() onBlockClicked = new EventEmitter<BlockInfo>();

  public blocks = [];
  public oddBlocks: number;
  public evenBlocks: number;

  constructor() { }

  ngOnInit(): void {
  }

  public calculateBlockDispersion = () => {
    if (!this._calculatingBlocks || !this._coefficient || !this._sum) {
      this.clearBlocks();

      return;
    }

    if ((this._calculatingBlocks) % 2 === 0) {
      this.oddBlocks = (this._calculatingBlocks) / 2;
      this.evenBlocks = this.oddBlocks;
    } else {
      this.oddBlocks = (this._calculatingBlocks) / 2 - 0.5;
      this.evenBlocks = (this._calculatingBlocks) / 2 + 0.5;
    }

    const denominator = this.evenBlocks + this.oddBlocks * this._coefficient;
    const remainder = this._sum % denominator;

    if (remainder === this._sum || remainder === 0) {
      window.alert('Not able to disperse');

      return;
    }
    
    const evenValue = (this._sum - remainder) / denominator;
    const oddValue = evenValue * this._coefficient;

    for (let i = 0; i < this._calculatingBlocks; i++) {
      i % 2 === 0 ? this.blocks.push({value: evenValue}) : this.blocks.push({value: oddValue});
    }
    this.blocks.push({value: remainder});
  }

  public isEven = (number: number) => number % 2 === 0 ? true : false;

  public emitBlockInfo = (blockValue: number, blockIndex: number) => {
    this.onBlockClicked.emit({value: blockValue, index: blockIndex});
  }

  private clearBlocks = () => {
    this.blocks = [];
    this.onBlockClicked.emit(null);
  }
}
