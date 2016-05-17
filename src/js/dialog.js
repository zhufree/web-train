;
function Dialog(context, type) {
	this.context = context;
	this.dialogDom = $('<div>', {class: 'dlg-cover'})
		.append($('<div>', {class: 'dlg-box'})
			.append($('<button>', {class: 'dlg-sure-btn', text: 'Sure'})
				)
			);
	$(this.context).append(this.dialogDom);
}

$(document).on('click', '#create', function(event) {
	event.preventDefault(); 
	newDialog = new Dialog($(event.target).parent());
})
.on('click', '.dlg-sure-btn', function(event) {
	thisDialog = $(event.target).closest('.dlg-cover');
	thisDialog.remove();
});