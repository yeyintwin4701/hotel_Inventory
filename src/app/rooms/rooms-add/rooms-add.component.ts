import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent implements OnInit {
  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    checkInTime: new Date(),
    checkOutTime: new Date(),
    photos: '',
    rating: 0,
    //roomNumber: ''
  };

  successMessage: string = '';

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {}

  AddRoom(roomsForm: NgForm) {
    this.roomsService
      .addRooms(this.room)
      .subscribe((data) => (this.successMessage = 'Rooms added successfully'));
      roomsForm.resetForm ({
      roomType: '',
      amenities: '',
      price: 0,
      checkInTime: new Date(),
      checkOutTime: new Date(),
      photos: '',
      rating: 0,
      })
  }
}
