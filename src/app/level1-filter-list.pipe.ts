import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'level1FilterList'
})
export class Level1FilterListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args)
     return value;
    return value.filter(
      item => item.coreItemValue.toLowerCase().indexOf(args.toLowerCase()) > -1
   );
  }

}
