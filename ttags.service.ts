import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { ITags } from './ITags';

@Injectable()
export class TTagsService {
/*
-------------------------------------------------------------------------------------
S U M M A R Y
-------------------------------------------------------------------------------------
  This service contains the corresponding method call as defined by the
  @Input() in the component.  You must add your own method here to return the data
  you will be using for your type-ahead values.
  Or more simply put:
    Add a call to your endpoint to return data or lists of values for use in the type-ahead feature.
  getSolarFields is a real example.
*/



/*
-------------------------------------------------------------------------------------
P R O P E R T I E S
-------------------------------------------------------------------------------------
*/
    private fieldsList: Array<{ fieldName: string, tableName: string }>;
    private retval: Array<{ tagName: string, tagKey: string }>;
    private editmode: boolean;
    private mySavedTag: string;
    //private _serviceUrl = 'http://localhost:62052/api/tags';  // URL to web api
    private _serviceurl = 'http://localhost:62052/api/tags';
    private data: Array<{letters: string, count: number}>;
    private loadOnce =  false; // prevents the menu dropdown from re-loading numerous times

    constructor( private http: Http ) {
       this.retval = [];
    }



    // ***  M e t h o d s  *** //

    getEditMode() {
      return this.editmode;
    }
    setValue(val) {
        this.mySavedTag = val;
    }
    getValue() {
        return this.mySavedTag ;
    }

    // proof-of-concept data
    testData(_type: string): any {
      this.retval.push({ tagName: 'Vincent J Mascatello, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'James P Jensvold, DDS', tagKey: '1key'});
      this.retval.push({ tagName: 'Mohammadreza Minouei, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Jessica Lee White, PA-C', tagKey: '1key'});
      this.retval.push({ tagName: 'Elizabeth C Ritz-Gorosics, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'William Michael Donovan, CRNA', tagKey: '1key'});
      this.retval.push({ tagName: 'Gary Schwarz, DDS', tagKey: '1key'});
      this.retval.push({ tagName: 'Kanchan Pema, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Patricia Hope Monk, NP', tagKey: '1key'});
      this.retval.push({ tagName: 'William Cuppy Shriner, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Ravish Ismail Narvel, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Mark E McDonnell, DPM', tagKey: '1key'});
      this.retval.push({ tagName: 'Susan A Fried, PA', tagKey: '1key'});
      this.retval.push({ tagName: 'Leslie P Dean, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Neil Agnihotri, DMD, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Coral D Hanevold, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Octavio J. Calvillo, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Whitley Nicole Ivey, Hearing Screener', tagKey: '1key'});
      this.retval.push({ tagName: 'Eugene P. Chambers, Jr., MD', tagKey: '1key'});
      this.retval.push({ tagName: 'James S Weston, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Farrell M Calton, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Allan Seymour Disraeli, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Dan F Martin, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Keith A. Wintermeyer, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Gordon  Nidiffer, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Allan  Hurst, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Michael FS Douglas, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Crystal Ryan Herrera, ARNP', tagKey: '1key'});
      this.retval.push({ tagName: 'Laurie Buccinna Small, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Diane K. Smith, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'George J Fyffe, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Scott T Lowe, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Charles I Glaser, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'William F. Mieler, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Calvin W Martin, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Lorraine Y Pan, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Randolph Warren Evans, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Walter J. Zawislak, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Jason S Thomas, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Ramon Antonio Guevara, DO', tagKey: '1key'});
      this.retval.push({ tagName: 'D. Ware Branch, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Vincent G Williams, PA-C', tagKey: '1key'});
      this.retval.push({ tagName: 'Carlos Joaquin Vazquez, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Erica C Enger, PA', tagKey: '1key'});
      this.retval.push({ tagName: 'Humberto Antonio Liriano-Fanduiz, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Samuel Leon Strickland, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Rodney J Laningham, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Thomas H Coleman, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Rebecca Byrd, NP', tagKey: '1key'});
      this.retval.push({ tagName: 'Faustino G Ramos, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Jaclyn Miller Piasta, NP', tagKey: '1key'});
      this.retval.push({ tagName: 'David Nunley, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Samuel R Oleinick, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Bozman Rell Reeves, Jr., MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Joshua  Hedaya, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Jaime Rueda-Rojas, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Millard W Ramsey, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Robert Joseph Grube, JR, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Lizabeth E Larson, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'James G. Duncan, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Patricia E Bergey, PA-C', tagKey: '1key'});
      this.retval.push({ tagName: 'Donald L Wakefield, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Michael Robert Piazza, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Joseph O Mennen, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Lucia Ramos Fernandes Hansen, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Matthew Joseph MacCarrick, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Robert E Green, DO', tagKey: '1key'});
      this.retval.push({ tagName: 'Stephen J. Laquis, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Christine A Robb, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Sue C Mengel, CRNA', tagKey: '1key'});
      this.retval.push({ tagName: 'Stephen M Goode, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Tuan Ngoc Nguyen, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Jerry  Daniel, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Alireza Abolmaali Damghani, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'A. Florentina  Taylor, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Jennifer A Glassman, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Amber Buchheit, RN', tagKey: '1key'});
      this.retval.push({ tagName: 'Venkat  Aachi, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Sasi Kiran Nayudu, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Dennis M Allin, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Gail L Gilmore, DO', tagKey: '1key'});
      this.retval.push({ tagName: 'Seymour  Goldstein, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Rebecca Rodriguez, DA', tagKey: '1key'});
      this.retval.push({ tagName: 'Cameron Whitaker, PA-C', tagKey: '1key'});
      this.retval.push({ tagName: 'James Mark Karlen, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Andrew C Bourne, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'George Wendel  Yee, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Paula M Foust, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Nitin J Engineer, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Bogdan Romen Marcol, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Madhu S. Bhatia, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Dan G Sotingeanu, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Earl Labuga, PA', tagKey: '1key'});
      this.retval.push({ tagName: 'Martha A. Nelson, LMSW', tagKey: '1key'});
      this.retval.push({ tagName: 'Kenneth Thomas Kray, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Lisa Ann Farmer, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Sean  McFadden, DO', tagKey: '1key'});
      this.retval.push({ tagName: 'M. Alexander Jacocks, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Patrick K Kelley, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'Cody William Dunbar Smith, MD', tagKey: '1key'});
      this.retval.push({ tagName: 'John  G Charles, PA', tagKey: '1key'});

      return this.retval;
    }

  getSolarFields(myData: string): any {
    if (this.loadOnce === false) {
      this.retval = this.testData('');
      this.loadOnce = true;
    }
    const result = this.retval.filter(ret => ret.tagName.substr(0, myData.length).toLowerCase() === myData.toLowerCase());
    return result;
  } // end of getSolarFields method

  // getProviders(myLetters, myCount? = 1) {
  //     this.http.request(this._serviceurl + '/getProviders', {
  //       params: {
  //         letters: myLetters,
  //         count: myCount,
  //       }).subscribe((res: Response) => {
  //     this.data = res.json();
  //   });
  //   return this.data;
  // }


  getProviders(myLetters, myCount = 1): Observable<ITags[]> {
     return this.http
      .get(this._serviceurl + '/getProviders', {
          params: {
              letters: myLetters,
              count: myCount
          }
      })
      .map((response: Response) => <ITags[]>response.json());
  }

} /* end of class */

