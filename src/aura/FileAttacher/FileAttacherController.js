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
    }

})
