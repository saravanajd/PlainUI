$(document).ready(function () {
  loadPage("Form");

  $(".sidebar-nav a").click(function () {
    const fileName = $(this).attr("data-workspace-src");
    loadPage(fileName);
  });
});

function loadPage(fileName) {
  $("#main").load(fileName + ".html");
  setTimeout(function () {
    initDataWorkspace();
    initAngularJs('CalendarController');
  },100);
}

function initAngularJs(controllerName){

}
