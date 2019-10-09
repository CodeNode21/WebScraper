// add the document selectors and logic for display on DOM
$(document).ready(function() {
    const $scrapeIt = $("#scrapeIt");
    const $openSavedNotes = $(".openNotes");
    const $openNewNotes = $(".newNotes");
    const $SaveNote = $("#saveNewNote");
    const $checkScrape = $("#checkScrape");

    $scrapeIt.on("click", handleScrape);
    $openSavedNotes.on("click", openNoteModal);
    $openNewNotes.on("click", openNewNoteModal)
    $SaveNote.on("click", getNoteInput)

    function handleScrape() {

        return $.ajax({
            type: "GET",
            url: "/scrapeit",
        }).then(function(data) {
            console.log(data)
            
            $("#newNotesModal").modal('hide')
            location.reload()
        
        })
    }
    


    function openNoteModal() {
        let id = $(this).attr("article-id")

        return $.ajax({
            type: "GET",
            url: "/notes/" + id,
            id: id
        }).then(function (data) {
            console.log(data)
            let noteBody = $("#noteBody");
            let dbNote = data.note // this is an array
            let articleId = data._id // this is the article id

            noteBody.attr("article-id", articleId)
            noteBody.write(dbNote)

            $("#savedNotesModal").modal('hide')

        })
    }
    


    function openNewNoteModal() {
        let id = $(this).attr("article-id")
        $("#saveNewNote").attr("data-id", id)
    }



    function getNoteInput() {
        let id = $(this).attr("data-id")
        let input = $("#userTextInput").val();
        return $.ajax({
            type: "POST",
            url: "/notes/" + id,
            id: id,
            data: {
                body: input
            }
            
        }).then(function (data) {
            console.log(data)
            console.log("note added")
            $("#userTextInput").val("");
            $("#newNotesModal").modal('hide')
            location.reload()
        })
    }

    // deleting a note
    $('.remove-item').on('click', function (e) {
        console.log('clicked remove-item btn');
        e.stopPropagation();
        var id = $(this).attr("data-id");
        $.ajax({
            method: "PUT",
            url: "/articles/note/" + id
        })
            // With that done, add the note information to the page
            .then(function (data) {
                location.reload()
            });

    });



  

}) // end document.ready