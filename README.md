## Deprecating -- There are File Utilities as base components now, and this is 2017 style

File utilities for Salesforce Lightning. Currently for Salesforce Lightning Experience only.

_Components_

1. File Attacher: Uploads the files on a related recordId as attachments. Currently drag and drop of multiple files only. Click to upload through the file chooser is still being worked on. Large file sizes not implemented yet.

This is all work in progress right now. Updated to support Winter 17 style <lightning:icon .../> tag use instead of SVG. (if you're on Summer 16 you'll want to use the svgIcon tag)
So, in FileAttacher.cmp, roll
~~~~
<lightning:icon iconName="utility:upload" size="large" alternativeText="Click to upload files"/>
~~~~
back to
~~~~
<c:svgIcon svgPath="/resource/WIN17SLDS/assets/icons/action-sprite/svg/symbols.svg#upload" category="action" size="small" name="upload" assistiveText="Drag files here to upload" class="slds-button__icon " />
 ~~~~

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
