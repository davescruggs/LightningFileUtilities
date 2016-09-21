({
    onInit: function(component, event, helper) {
        component.set("v.pictures", []);
				console.log("++++ FileAttacher:onInit Getting Attachments +++++");
				helper.getAttachments(component);
				console.log("++++ FileAttacher:onInit Exiting +++++");
    },

    onDragOver: function(component, event) {
        event.preventDefault();
    },

    onDrop: function(component, event, helper) {

        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

        var files = event.dataTransfer.files;

        for (var i = 0; i < files.length; i = i + 1) {
            var file = files[i];
          //  if (file.size < 750000)) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    var dataURL = e.target.result;
                    //var pictures = component.get("v.pictures");
                    //pictures.push(dataURL);
                    //component.set("v.pictures", pictures);
                    helper.upload(component, file, dataURL.match(/,(.*)$/)[1]);
                };
                reader.readAsDataURL(file);
          //  }
        }
				helper.getAttachments(component);
    },
		onChooserClose: function(component, event, helper){

			// file-upload-input-01
			var fileInput = component.find("file-upload-input-01").getElement();
			// for each file section (just one file now)
			var file = fileInput.files[0];
			var fileCount = fileInput.files.length;
			console.log("file chooser changed or took input");
			console.log("The user selected " + fileCount + " files.");

			if (file.size > 750000){
				var toastEvent = $A.get("e.force:showToast");
				 toastEvent.setParams({
						"title": "File Too Large!",
						"message": "The file is " + file.size + " bytes, which is too large for upload."
				});
				toastEvent.fire();
				return;
			}
			var fr = new FileReader();
			fr.onload = function(){
				var fileContents = fr.result;
				var base64Mark = 'base64,';
				var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;

				fileContents = fileContents.substring(dataStart);
				helper.upload(component, file, fileContents);
			}
			fr.readAsDataURL(file);
			// end for each file (just one now)
		}

})
