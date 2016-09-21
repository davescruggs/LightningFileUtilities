public with sharing class FileAttacherExtensionController {

	private final sObject mysObject;

    // The extension constructor initializes the private member
    // variable mysObject by using the getRecord method from the standard
    // controller.
    public FileAttacherExtensionController(ApexPages.StandardController stdController) {
        this.mysObject = (sObject)stdController.getRecord();
    }

    public String getRecordName() {
        return 'Hello ' + (String)mysObject.get('name') + ' (' + (Id)mysObject.get('Id') + ')';
    }

		@AuraEnabled
		public static Id saveAttachment(Id parentId, String fileName, String base64Data, String contentType) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');

        Attachment a = new Attachment();
        a.parentId = parentId;

        a.Body = EncodingUtil.base64Decode(base64Data);
        a.Name = fileName;
        a.ContentType = contentType;

        insert a;

        return a.Id;
    }

		@AuraEnabled
		public static List<Attachment> getAttachments(String parentId) {
				return [
						SELECT Id, Name
						FROM Attachment
						WHERE ParentId = :parentId
						LIMIT 5
				];
		}
}
