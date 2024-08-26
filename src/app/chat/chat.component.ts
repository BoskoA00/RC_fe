import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PorukeService } from '../poruke.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  opened: boolean = false;
  brojNeprocitanihPoruka: number = 0;
  poruke: any[] = [];
  senderId: number = 0;
  selectedMessage: any = {};
  messageSelected: boolean = false;
  novaP: boolean = false;
  users: any[] = [];
  messageReceiver: any = null;
  messageContent: string = '';
  constructor(
    private userService: UserService,
    private porukeService: PorukeService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedIn && this.userService.loggedUser) {
      this.senderId = this.userService.loggedUser.id;
    }
    this.loadPoruke();
    this.loadUsers();
  }

  openChat(): void {
    this.opened = !this.opened;
    this.novaP = false;
    this.selectedMessage = {};
    this.messageSelected = false;
  }
  loadUsers(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res.filter((user: any) => user.id !== this.senderId);
    });
  }
  loadPoruke(): void {
    this.porukeService.getMessages(this.senderId).subscribe(
      (data) => {
        this.poruke = data.reverse();
        this.brojNeprocitanihPoruka = data.filter((p) => p.status === 0).length;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  refresh(): void {
    this.selectedMessage = {};
    this.messageSelected = false;
    this.novaP = false;
    this.loadPoruke();
  }
  novaPoruka(): void {
    this.selectedMessage = {};
    this.messageSelected = false;
    this.novaP = true;
  }
  selectPoruku(id: number) {
    this.messageSelected = true;
    this.selectedMessage.id = id;
    let p = this.poruke.find((p) => p.id === id);
    this.selectedMessage.content = p.content;
    this.selectedMessage.sender = p.senderUserName;
    if (p.status === 0) {
      this.porukeService.readMessage(this.selectedMessage.id).subscribe(
        (data) => {
          this.brojNeprocitanihPoruka--;
          p.status = 1;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  sendPoruku() {
    if (this.messageReceiver == null) {
      this.messageReceiver = 'Odaberite primaoca poruke';
      return;
    }
    if (
      this.messageContent.trim().length == 0 ||
      this.messageContent.trim() == 'Poruka mora imati neki sadrzaj'
    ) {
      this.messageContent = 'Poruka mora imati neki sadrzaj';
      return;
    }
    const receiverExists = this.users.some(
      (user) => user.userName === this.messageReceiver
    );
    if (!receiverExists) {
      this.messageReceiver = 'Ne postoji zeljeni primaoc';
      return;
    }
    let p = {
      content: this.messageContent,
      senderId: this.senderId,
      receiverId: this.users.find(
        (user) => user.userName === this.messageReceiver
      ).id,
    };
    this.porukeService.createMessages(p).subscribe(
      (data) => {
        this.novaP = false;
        this.loadPoruke();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
