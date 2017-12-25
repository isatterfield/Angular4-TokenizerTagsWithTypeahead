import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, NgSwitch } from '@angular/common';
import {Observable} from 'rxjs/Observable';

import { TTagsService } from './ttags.service';

/*  S U M M A R Y
*   TokenTags (ttags for short)
*     this nested component (aka directive)
*     will take any value entered into its textbox
*     and make it look and behave like a token after
*     the enter key is pressed.
*
*   This component includes a service and html
*   It is intended to work with a type-ahead look 'n feel
*     when desired by setting UseTypeAhead to either true or false
*     otherwise only the tag entered directly is saved
*/

@Component({
   selector: 'app-tokentags',
   templateUrl: './ttags.component.html',
   styleUrls: ['./ttags.component.css']
  })

  export class TtagsComponent  implements OnInit  {
     /*
    * parent component should pass-in the name of the service method to pull data
    * for the type-ahead functionality
    * USAGE NOTE:   Please add the ttags.service.ts method to correspond with the value
    *               passed in as TypeAheadService having that method either return values
    *               from a database or a hard-coded list that the developer must create
    *              the datalist integration is coming next.
    */
    @Input() UseTypeAhead: string; //  = true; // for direct work on ttags/ttags page
    @Input() TypeAheadService: string; // = 'getSolarFields'; // for direct work on ttags/ttags page
    @Input() UseDataset: string;

    // ***  L O C A L   V A R I A B L E S  *** //
    private IsThereData = false;
    private value = '';         // value stores the user entry before adding it to the tagsCollection
    private edittag = '';       // edittag holds a modified tag
    private editit = false;     // tracking indicator that the user has clicked over an existing tag to edit
    private menuIsOn = false;   // let's the update know if it should use the menu selection or keep quiet
    private ShowRemoveAll = false; // indicates the X on the box should be displayed to remove all tags within it
    private data: Array<{tagName: string}>;
    /*
    tagsCollection maintains a list of all the values
    entered by the user, it is a local array containing
    an object of a single property
   */
    tagsCollection: Array<{ mytag: string, editmode: boolean }>;

    @ViewChildren('menuSpan') menus: QueryList<ElementRef>;
    @ViewChild('box') boxtag: ElementRef;

    constructor (private tagsService: TTagsService) { this.tagsCollection = []; }

  ngOnInit() {  }


  // ***  M E T H O D S  *** //
  selectField(selectedItem: string) {
      this.value = selectedItem; // prep the selection for updating by storing it to the value used
      this.menuIsOn = false; // this is to tell the update statement that it can now process
      this.update(); // add the selected menu item to the array and display it
  }

  typeahead() {
    if (this.UseTypeAhead === 'true') { // if this isn't set to true, there is no reason to continue processing the typeahead
      if (this.value.length === 1 && this.UseTypeAhead) {
          this.IsThereData = true; // makes the type-ahead box visible and only need to fire it once
          this.menuIsOn = true;
        }
    if (this.UseDataset === 'true') {
      this.tagsService[this.TypeAheadService](this.value).subscribe(retval => this.data = retval);
      } else {
        this.data = this.tagsService[this.TypeAheadService](this.value); // NAME OF method passed into @Input TypeAheadService
      }
    }
  }

  removeAll() {
    this.tagsCollection.length = 0;
    this.ShowRemoveAll = false;
  }

  /* S U M M A R Y
  * this updates the tagsCollection with each new entry into
  * the tag box after user presses enter.
  */
  update() {
    if (this.value !== '' && !this.menuIsOn) {
      this.tagsCollection.push({ mytag: this.value, editmode: false });
      this.value = '';
      this.IsThereData = false; // reset the type-ahead display box as well
      this.boxtag.nativeElement.focus();
      this.ShowRemoveAll = true;
    //  this.getTagList.emit(this.tagsCollection);
    }
  }

/* S U M M A R Y
* this cleans up if the user presses the escape key
*/
  closeUpAndReset() {
    this.value = '';
    this.IsThereData = false;
    this.menuIsOn = false;
    this.boxtag.nativeElement.focus();
  }

/* S U M M A R Y
* the user is entering a new jt-tag and presses the
* down arrow to give the menu focus
*/
  goMenuFocus() {
    if (this.menuIsOn) {
      this.menus.first.nativeElement.focus();
    }
  }

  /* S U M M A R Y
  * user has edited an existing token and now the new value needs presented in the array
  */
  updateEdit() {
    if (this.edittag !== '' ) {
      const savedtag = this.tagsService.getValue(); // token was saved to the injected service upon modification
      const _index = this.tagsCollection.findIndex(x => x.mytag === savedtag); // find the token that was edited
      this.tagsCollection[_index].editmode = false; // take it out of edit mode
      this.tagsCollection[_index].mytag = this.edittag; // save the newly modified value
      this.edittag = ''; // reset the edittag so other tags can  now be edited
    }
  }

  /* S U M M A R Y
  * when an existing tag is clicked on, this event
  * will fire and manage the edit of an existing tag
  */
  tagClicked(tag: string)  {
    if (this.edittag === '') {
      this.tagsService.setValue(tag); // save the original tag to the service
      const _index = this.tagsCollection.findIndex(x => x.mytag === tag);
      this.tagsCollection[_index].editmode = true;
      this.edittag = tag;
    }
  }

  /* S U M M A R Y
  * Checks if a tag is already being edited
  */
  isTagEdited(tag: string) {
    let retval = false;
    if (this.tagsService.getEditMode()) {
      retval = true;
    }
    return retval;
  }

  /* S U M M A R Y
  * this will remove a single token from the list
  */
  removeTag(tag) {
    const _index = this.tagsCollection.findIndex(x => x.mytag.toLowerCase() === tag.toLowerCase());
    this.tagsCollection.splice(_index, 1);
  }

}

