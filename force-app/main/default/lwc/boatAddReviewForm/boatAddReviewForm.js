import { api, LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/BoatReview__c.Name';
import COMMENT_FIELD from '@salesforce/schema/BoatReview__c.Comment__c';
import RATING_FIELD from '@salesforce/schema/BoatReview__c.Rating__c';
import BOAT_REVIEW_OBJECT from '@salesforce/schema/BoatReview__c';
import BOAT_FIELD from '@salesforce/schema/BoatReview__c.Boat__c';

const SUCCESS_TITLE = 'Review Created!';
const SUCCESS_VARIANT = 'success';

export default class BoatAddReviewForm extends LightningElement {

    @api boat;
   boatId;
    nameField = NAME_FIELD;
    commentField = COMMENT_FIELD;
    boatReviewObject = BOAT_REVIEW_OBJECT;
    rating = 0;
    review = '';
    title = '';
    comment = '';


   @api
    get recordId() {
        return this.boatId;
     }
     set recordId(value) {
      this.boatId = value;
  }
// Gets user rating input from stars component
handleRatingChanged(event) {
     this.rating = event.detail.rating;
  }
// Custom submission handler to properly set Rating
// This function must prevent the anchor element from navigating to a URL.
// form to be submitted: lightning-record-edit-form
handleSubmit(event) {
  event.preventDefault();
  const fields = event.detail.fields;
  fields.Boat__c = this.boatId;
  fields.Rating__c = this.rating;
  this.template.querySelector('lightning-record-edit-form').submit(fields);
  }
 
 // Shows a toast message once form is submitted successfully
 // Dispatches event when a review is created
 handleSuccess() {
   // TODO: dispatch the custom event and show the success message
   const evt = new ShowToastEvent({
       title: SUCCESS_TITLE,
       variant: SUCCESS_VARIANT
   });
   this.dispatchEvent(evt);
   this.dispatchEvent(new CustomEvent('createreview'));
   this.handleReset();
 }
 
 // Clears form data upon submission
// TODO: it must reset each lightning-input-field
 handleReset() { 
   const inputFields = this.template.querySelectorAll(
       'lightning-input-field'
   );
   if (inputFields) {
       inputFields.forEach(field => {
           field.reset();
       });
   }
 }

}
