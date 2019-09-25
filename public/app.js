$(document).ready(function() {
	const $scrapeStart = $("#scrapeStart");
	const $openSavedNotes = $(".openNotes");
	const $openNewNotes = $(".newNotes");
	const $SaveNote = $("#saveNewNote");
	const $checkScrape = $("#checkScrape");
	
	$scrapeStart.on("click", handleScrape);
	$openSavedNotes.on("click", openNoteModal);
	$openNewNotes.on("click", openNewNoreModal);
	$SaveNote.on("click", getNoteInput);
	
	function handleScrape() {
		
		return $.ajax({
			type: "GET",
			url: "/scrapeIt",
		}).then(function(data) {
			console.log(data)
			$("#newTagsModal").modal("hide")
			location.reload()
			
		})
	}
	
	function openTagModal() {
		let id = $(this).attr("article-id")
		
		return $.ajax({
			type: "GET",
			url: "/tags/" + id,
			id: id
		}).then(function(data) {
			console.log(data)
			let tagBody = $("#tagBody");
			let dbNote = data.tag
			let businessId = data._id
			
			tagBody.attr("article-id, articleId)
			tagBody.write(dbNote)
			$("#savedTagsModal").modal("hide")
			
		})
	}
	
	function openTagModal() {
		let id = $(this).attr("article-id")
		$("#saveNewTag").attr("data-id", id)
	}
	
	function getTagInput(){
		let id = $(this).attr("data-id")
		let input = $("#userTextInput").val();
		return $.ajax({
			type: "POST",
			url: "/tagss/" + id,
			id: id,
			data: {
				body: input
			}
			
		}).then(function (data) {
			console.log(data)
			console.log("tag added")
			$("#userTextInput").val("");
			$("#newTagsModal").modal("hide")
			location.reload()
		})
	}
	
	$(".remove-item").on("click", function (e) {
		console.log("clicked remove-item btn");
		e.stopPropagation();
		var id = $(this).attr("data-id");
		$.ajax({
			method: "PUT",
		url: "/business/tag/" + id
		})
		.then(function (data) {
			location.reload()
		});
	});
})
