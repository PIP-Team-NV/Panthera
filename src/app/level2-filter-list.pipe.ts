import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'level2FilterList'
})
export class Level2FilterListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args)
     return value;
    return value.filter(
      item => item.name.toLowerCase().indexOf(args.toLowerCase()) > -1
   );
  }
}
