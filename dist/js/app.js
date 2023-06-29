$(document).ready(function () {
  $(".submenu-wrapper > a").click(function () {
    const submenuWrapperEl = $(this).closest(".submenu-wrapper");
    toggleSidebarDropdownMenu(submenuWrapperEl);
  });
  initDataWorkspace();
});

function initDataWorkspace() {
  const elDataWorkSpace = $("#navData");
  const workspaceSrcText = elDataWorkSpace.attr("data-workspace-src");

  const navItem = $('.sidebar-nav a[data-workspace-src="' + workspaceSrcText + '"]');
  if(!navItem){
    return;
  }

  $('.sidebar-nav a, .sidebar-nav li').removeClass('active');
  document.title = workspaceSrcText;
  navItem.addClass('active');
  navItem.closest('li').addClass('active');

  const isSubMenu = navItem.hasClass('submenu-item');
  if(!isSubMenu){
    return;
  }
  navItem.closest('.submenu-wrapper').addClass('open');
}

function toggleSidebarDropdownMenu(el) {
  el.toggleClass("open");
}

function toggleMenu() {
  $(".wrapper").toggleClass("sidebar-toggle");
}
