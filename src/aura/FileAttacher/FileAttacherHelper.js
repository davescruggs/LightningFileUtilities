({
    upload: function(component, file, base64Data) {
        var action = component.get("c.saveAttachment");
        action.setParams({
            parentId: component.get("v.recordId"),
            fileName: file.name,
            base64Data: base64Data,
            contentType: file.type
        });
				console.log("saving " + file.name + " of type " + file.type + " to record " + component.get("v.recordId") );
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
								component.set("v.message", "Image uploaded " + a.getReturnValue());
                // You would typically fire a event here to trigger
                // client-side notification that the server-side
                // action is complete
            }
            //else if (cmp.isValid() && state === "INCOMPLETE") {
            else if (state === "INCOMPLETE") {
                // do something
								console.log("status in upload callback is incomplete");
            }
            //else if (cmp.isValid() && state === "ERROR") {
            else if (state === "ERROR") {
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
    }
})
