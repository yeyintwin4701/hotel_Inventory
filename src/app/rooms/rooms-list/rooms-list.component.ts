import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { RoomList } from '../rooms';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() room : RoomList[] = [];

  @Input() title: string = "";

  @Input() price=0;

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error('Method not implemented.');
    console.log(changes);
    if(changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }
   
  ngOnInit(): void {
  }

  selectRoom(rooms: RoomList) {
    this.selectedRoom.emit(rooms);
  }

  ngOnDestroy() {
    console.log("on destroy is called.")
  }

}
