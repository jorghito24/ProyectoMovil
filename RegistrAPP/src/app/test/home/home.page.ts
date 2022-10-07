import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  persons = Array<Person>()

  constructor(
    private PersonService: PersonService
  ) { }

  execute() {
    const params = []
    for (let i = 0; i < 100; i++) {
      const person = new Person();
      person.fullname = 'Person: ' + (i + 1).toString();
      params.push(person)
    }
    this.PersonService.sync(params).then(() => {
      this.PersonService.get().then((data: Person[]) => {
        this.persons = data;
      }).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }
  ngOnInit() {
  }

}
