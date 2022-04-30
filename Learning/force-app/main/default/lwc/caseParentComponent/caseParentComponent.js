import { LightningElement, api } from 'lwc';
import createCaseComments from '@salesforce/apex/CaseCommentsHandler.createCaseComments';
export default class CaseParentComponent extends LightningElement {
    @api recordId;
    comment;
    handleCommentValue(event) {
        this.comment = event.detail;
        console.log('Received Comments input at Parent ' + this.comment);
    }
    // handleClick(event) {
    //     const recordInput = {
    //         apiName: CASECOMMENT_OBJECT.objectApiName,
    //         fields: {
    //             CommentBody: this.comment,
    //             ParentId: "5001U00000vuDC7QAM"
    //         }
    //     };
    //     createRecord(recordInput).then(result => { console.log('Record Created Successfully') }).catch(error => { console.log('Error while creating record' + JSON.stringify(error)) });
    // }
    handleClick(event) {
        createCaseComments({ commentsBody: this.comment, parentCaseId: this.recordId }).then(result => {
            console.log('Record Created Successfully ' + JSON.stringify(result))
        }).catch(error => {
            console.log('Error while creating Record' + JSON.stringify(error))
        });
    }
}