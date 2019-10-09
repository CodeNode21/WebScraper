$(document).ready(function() {
	const $scrapeStart = $("#scrapeStart");
	const $openSavedTags = $(".openTags");
	const $openNewTags = $(".newTags");
	const $SaveTag = $("#saveNewTag");
	
	$scrapeStart.on("click", handleScrape);
	$openSavedTags.on("click", openTagModal);
	$openNewTags.on("click", openNewTagModal);
	$SaveTag.on("click", getTagInput);
	
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
		let id = $(this).attr("tag-id")
		
		return $.ajax({
			type: "GET",
			url: "/tags/" + id,
			id: id
		}).then(function(data) {
			console.log(data)
			let tagBody = $("#tagBody");
			let dbTag = data.tag
			let businessId = data._id
			
			tagBody.attr("tag-id", businessId)
			tagBody.write(dbTag)
			$("#savedTagsModal").modal("hide")
			
		})
	}
	
	function openNewTagModal() {
		let id = $(this).attr("tag-id")
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
