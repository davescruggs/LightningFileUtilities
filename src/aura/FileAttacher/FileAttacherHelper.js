({
	MAX_FILE_SIZE: 750 000,
	upload: function(component, file, base64Data) {
        var action = component.get("c.saveAttachment");
        action.setParams({
            parentId: component.get("v.recordId"),
            fileName: file.name,
            base64Data: base64Data,
            contentType: file.type
        });
        console.log("saving " + file.name + " of type " + file.type + " to record " + component.get("v.recordId"));
        console.log("===== start file data ===== ");
        console.log(base64Data);
        console.log("=====  end file data  ===== ");
        action.setCallback(this, function(a) {
            var state = a.getState();
            console.log("in upload callback method");
            //component.set("v.message", state==="SUCCESS"?"Image uploaded":"Upload error");
            console.log("upload callback returned " + state);
            if (state === "SUCCESS") {
                // Alert the user with the value returned
                // from the server
                console.log("Upload callback returned from server: " + a.getReturnValue());
                component.set("v.message", "File uploaded with ID = " + a.getReturnValue());
                // You would typically fire a event here to trigger
                // client-side notification that the server-side
                // action is complete
            } else if (state === "INCOMPLETE") {
                // do something
                console.log("status in upload callback is incomplete");
            } else if (state === "ERROR") {
                var errors = a.getError();
                component.set("v.message", "Upload Error " + errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
        component.set("v.message", "Uploading...");
    },
    getAttachments: function(component) {
			var action = component.get("c.getAttachments");
			action.setParams({
					parentId: component.get("v.recordId")
			});
			console.log("getting attachments");

			action.setCallback(this, function(a) {
					console.log("** callback from getAttachments **");
					if (a.getState() === "SUCCESS") {
							var attachments = a.getReturnValue();
							component.set("v.attachments", attachments);
							console.log("retrieved attachements, there are " + attachments.length + " attachments");
					} else if (a.getState() === "ERROR") {
							console.log("Error getting attachments");
							var errors = a.getError();
							component.set("v.message", "Attachment Retrieval Error " + errors);
							if (errors) {
									if (errors[0] && errors[0].message) {
											console.log("Error message: " +
													errors[0].message);
									}
							} else {
									console.log("Unknown Attachment Retrieval Error");
							}
					}
			});
			$A.enqueueAction(action);
    }
})
