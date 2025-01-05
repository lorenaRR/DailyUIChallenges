import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

class User {
  user: string;
  password: string;
  constructor() {
    this.user = '';
    this.password = '';
  }
}

class NewUser {
  name: string;
  birthdate: string;
  mail: string;
  user: string;
  password: string;
  password2: string;
  constructor() {
    this.name = '';
    this.birthdate = new Date().toDateString();
    this.mail = '';
    this.user = '';
    this.password = '';
    this.password2 = '';
  }
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = '001-Login';

  usersList = [{ user: 'admin', pass: 'admin' }, { user: 'user', pass: '1234' }, { user: 'scooby', pass: 'doo' }]

  slide1: boolean = true;
  slide2: boolean = false;
  slide3: boolean = false;

  cnt: number = 1;

  isNew: boolean = false;

  user: User = new User();
  newUser: NewUser = new NewUser();

  popUpActive: boolean = false;
  message: string = '';

  constructor() {
    this.newUser.birthdate = formatDate(Date.now(),'yyyy-MM-dd','en-US');
  }

  ngOnInit(): void {
    this.autoSlide();
  }

  onControlClick(slide: number) {
    this.cnt = slide;
    switch (slide) {
      case 1:
        this.slide1 = true;
        this.slide2 = false;
        this.slide3 = false;
        break;
      case 2:
        this.slide1 = false;
        this.slide2 = true;
        this.slide3 = false;
        break;
      case 3:
        this.slide1 = false;
        this.slide2 = false;
        this.slide3 = true;
        break;

      default:
        break;
    }

  }

  autoSlide() {
    setTimeout(() => {
      this.cnt === 3 ? this.cnt = 1 : this.cnt++;
      this.onControlClick(this.cnt);
      this.autoSlide();
    }, 6000);
  }

  singIn() {
    let exists = this.usersList.find(x => x.user === this.user.user && x.pass === this.user.password);
    if (exists) {
      this.popUpActive = true;
      this.message = 'Welcome in!';
      this.user = new User();
    }
    else {
      this.popUpActive = true;
      this.message = 'Incorret user or password.';
    }
  }

  singUp() {
    let user = { user: this.newUser.user, pass: this.newUser.password };
    this.usersList.push(user);
    this.popUpActive = true;
    this.message = 'Account created successfully!';
    this.newUser = new NewUser();
    this.user = new User();
    this.isNew = false;
  }

  validForm() {
    if (!this.validUser() || !this.validEmail() || !this.validPassword()
      || this.newUser.name === '' || !this.newUser.birthdate || this.newUser.mail === ''
      || this.newUser.user === '' || this.newUser.password === '' || this.newUser.password2 === '') {
      return false;
    }
    return true;
  }

  validUser() {
    let exists = this.usersList.find(x => x.user == this.newUser.user);
    if (exists) {
      return false;
    }
    return true;
  }

  validPassword() {
    if (this.newUser.password !== this.newUser.password2) {
      return false;
    }
    return true;
  }

  validEmail() {
    const regexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexPattern.test(this.newUser.mail);
  }

  ok() {
    this.popUpActive = false;
  }

}
