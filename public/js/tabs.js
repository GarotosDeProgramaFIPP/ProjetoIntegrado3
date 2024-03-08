function openTab(evt, tabId) {
    // Get all elements with class="tabcontent" and hide them
    $('.tabcontent').each(function () {
        $(this).css('display' , "none");
    });
  
    // Get all elements with class="tablinks" and remove the class "active"
    $('.tablink').each(function () {
        $(this).removeClass("active");
    })

    // Show the current tab, and add an "active" class to the button that opened the tab
    $(`#${tabId}`).css('display' , 'block');
    evt.currentTarget.className += " active";
}