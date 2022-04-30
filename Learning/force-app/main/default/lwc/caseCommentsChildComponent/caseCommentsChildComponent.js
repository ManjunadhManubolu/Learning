import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getCaseComments from '@salesforce/apex/CaseCommentsHandler.getCaseComments'
import COMMENT_BODY_FIELD from '@salesforce/schema/CaseComment.CommentBody';
import CREATED_DATE_FIELD from '@salesforce/schema/CaseComment.CreatedDate';
export default class CaseCommentsChildComponent extends LightningElement {
    @api caseId;
    existingCaseCommentsRecordsList;
    valCheck = 0;
    newComment;
    columns = [
        { label: 'Comments', fieldName: COMMENT_BODY_FIELD.fieldApiName, type: 'text', wrapText: true, hideDefaultActions: 'true' },
        { label: 'CreatedDate', fieldName: CREATED_DATE_FIELD.fieldApiName, type: 'date', hideDefaultActions: 'true' },
        { label: 'CreatedBy', fieldName: 'CreatedBy', type: 'text', hideDefaultActions: 'true' }
    ];
    connectedCallback() {
        console.log('Inside connectedcallback ' + this.caseId);
        this.getCaseCommentsRecords();
        this.valCheck += this.valCheck;
        console.log('Inside connectedcallback ' + this.caseId);
    }
    constructor() {
        super();
        this.valCheck += this.valCheck;
        console.log('Constructor ' + this.caseId);
    }
    renderedCallback() {
        this.valCheck += this.valCheck;
        console.log('inside renderedCallback ' + this.caseId);
    }
    /* @wire(getCaseComments, { parentCaseId: '$caseId' })
    getCaseCommentsList({ data, error }) {
        this.valCheck += this.valCheck;
        console.log('In Wire method' + this.valCheck);
        if (data) {
            this.existingCaseCommentsRecordsList = data.map(currentRecord => {
                return { ...currentRecord, CreatedBy: currentRecord.CreatedBy.Name }
            });
        }
        if (error) {
            console.log('There is some error man' + JSON.stringify(error));
        }
    } */
    getCaseCommentsRecords() {
        getCaseComments({ parentCaseId: this.caseId }).then(result => this.existingCaseCommentsRecordsList = result.map(currentRecord => {
            console.log('data is ' + JSON.stringify(currentRecord));
            return { ...currentRecord, CreatedBy: currentRecord.CreatedBy.Name }
        })).catch(error => console.log('There is an error' + error))
    }
    dispatchChangeToParent(event) {
        this.newComment = event.target.value;

        /* Creating Custom Event */
        const eventOnNewComment = new CustomEvent("commmentchange", { detail: this.newComment });

        /* Dispatches the Event*/
        this.dispatchEvent(eventOnNewComment);
    }
    @wire(CurrentPageReference)
    pageRef;

    get urlValue() {
        return this.pageRef ? JSON.stringify(this.pageRef) : '';
    }
}