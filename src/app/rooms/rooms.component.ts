import {
  Component,
  DoCheck,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  ViewChildren,
  Query,
  QueryList,
  SkipSelf,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked
{
  hotelName = 'Zwekabin Hotel';

  numberOfRooms = 45;

  hideRooms = true;

  title = 'Room List';

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 45,
    availableRooms: 20,
    bookedRooms: 25,
  };

  roomList: RoomList[] = [];

  stream = new Observable (observer =>{
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  })

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  totalBytes = 0;

  subscription !: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )
    
  constructor(@SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService,
  ) {}

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log("Request has been made!");
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log("Request Successful");
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes+= event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body)
        }
      }
    })

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });
    this.stream.subscribe ((data) => console.log(data));
    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });
  }

  ngDoCheck(): void {
    console.log('on changes happened');
  }

  ngAfterViewInit() {
    //console.log(this.headerComponent);
    this.headerComponent.title = 'Zwekabin Hotel';
    this.headerChildrenComponent.last.title = "Last Title";
  }

  ngAfterViewChecked() {}

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Room Lists';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Premium',
      amenities: 'Air Con, Free Wifi, Bath & WC',
      price: 25000,
      checkInTime: new Date('11-Nov-2025'),
      checkOutTime: new Date('12-Nov-2025'),
      rating: 4.544,
    };
    //this.roomList.push(room);
    //this.roomList = [...this.roomList, room];
    this.roomsService.addRooms(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '10',
      roomType: 'Premium',
      amenities: 'Air Con, Free Wifi, Bath & WC',
      price: 25500,
      checkInTime: new Date('11-Nov-2025'),
      checkOutTime: new Date('12-Nov-2025'),
      rating: 4.544,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  }

  deleteRoom() {
    this.roomsService.delete('10').subscribe((data) =>{
      this.roomList = data;
    })
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}