import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SmartTableData} from '../@core/data/smart-table';
import {CustomDataServerSource} from './CustomDataServerSource';

@Injectable({
  providedIn: 'root',
})
export class TableEventService {
  settings;
  entity;
  baseApi = 'http://localhost:8082/api/';

  source: CustomDataServerSource;


  constructor(private service: SmartTableData, private http: HttpClient) {
  }

  loadEntity(entity, settings) {
    this.entity = entity;
    this.settings = settings;
    /*
        this.http.get<any>(this.baseApi + this.entity + '/', {headers: this.headers}).subscribe(
          async data => {
            let initialData: any[];
            if (settings.superClass) {
              initialData = [];
              for (const classChild of settings.classChildren) {
                console.log(data._embedded[classChild]);
                data._embedded[classChild] ? initialData = initialData.concat(data._embedded[classChild]) : null;
              }
            } else {
              initialData = data._embedded[this.entity];
            }
            if (settings.joints) {
              for (const joint of settings.joints) {
                console.log(joint);
                await Promise.all(initialData.map(async item => {
                  const studentPrimeData = await this.http.get<any>(item._links[joint.entity].href, {headers: this.headers}).toPromise();
                  // console.log(studentPrimeDataInit);
                  for (const column of joint.columns) {
                    item[column] = studentPrimeData[column];
                  }
                }));
              }
            }
            console.log(initialData);
           // this.source.load(initialData);
          },
          this.handleError);
     */
    this.source = new CustomDataServerSource(this.http,
      {
        endPoint: this.baseApi + this.entity + '/',
        dataKey: settings.superClass ? `_embedded.` + settings.classChildren[0] : `_embedded.` + this.entity,
        totalKey: 'page.totalElements',
        pagerLimitKey: 'size',
        pagerPageKey: 'page',
        filterFieldKey: '#field#',
      });
    if (settings.autofilter && settings.autofilter.length) {
      for (const filter of settings.autofilter) {
        this.source.setFilter([{field: filter.column, search: filter.value}]);
      }
    }
  }

  onSearch(query: string) {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'email',
        search: query,
      },
    ], false);
  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to save?')) {

      const data = event.newData;
      this.http.patch<any>(this.baseApi
        + this.entity + '/'
        + event.newData.id, data).subscribe(
        async res => {
          console.log(event.data);
          event.confirm.resolve();
          this.source.refresh();
          // await this.source.update(event.data,res);
        },
        this.handleError);

    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create?')) {

      const data = event.newData;
      this.http.post<any>(this.baseApi + this.entity + '/', data).subscribe(
        async res => {
          console.log(res);
          await this.source.add(res);
          // await this.source.find(res);
          event.confirm.resolve();

        },
        this.handleError);

    } else {
      event.confirm.reject();
    }
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('Client-side error occured.', err);
    } else {
      console.log('Server-side error occured.', err);
    }

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.http.delete<any>(this.baseApi + this.entity + '/' + event.data.id).subscribe(
        async data => {
          console.log(data);
          await this.source.remove(event.data);
          event.confirm.resolve();
          // await this.source.reset();
        },
        this.handleError);
    } else {
      event.confirm.reject();
    }
  }

   /* this.source.getElements().then(els=>{
      //els.map(el=>{el.firstname="fd"});
      // event.close();
       this.source.load(els);
     });

     */
}
