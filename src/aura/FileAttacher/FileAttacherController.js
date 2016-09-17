({
    onInit: function(component) {
			component.set("v.pictures", []);
			getAttachments(component);
    },

    onDragOver: function(component, event) {
        event.preventDefault();
    },

    onDrop: function(component, event, helper) {

        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

        var files = event.dataTransfer.files;

        for (var i=0; i<files.length; i=i+1) {
            var file = files[i];
            if (file.type.match(/(image.*)/)) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    var dataURL = e.target.result;
                    var pictures = component.get("v.pictures");
                    pictures.push(dataURL);
                    component.set("v.pictures", pictures);
                    helper.upload(component, file, dataURL.match(/,(.*)$/)[1]);
                };
                reader.readAsDataURL(file);
            }
        }

    },

		getAttachments : function(component) {
			var action = component.get("c.getAttachments");
			action.setParams({
					parentId : component.get("v.recordId")
			});
			console.log("getting attachments");

			action.setCallback(this, function(a) {
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
