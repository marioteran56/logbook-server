import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // constructor(
  //   private studentsService: StudentsService,
  // ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // updateDatabase(obj: any) {
  //   if (obj.students) {
  //     obj.students.forEach((element) => {
  //       this.studentsService.create(element);
  //     });
  //   } else if (obj.schedules) {

  //   }
  // }
}
