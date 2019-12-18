export function brand() {
    return (
        `<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="#">VEK.EXE</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-supported-content">
        <span class="navbar-toggler-icon"></span>
        </button>
<div class="collapse navbar-collapse" id="navbar-supported-content">
             <ul class="navbar-nav mr-auto">`);
}

export function navActive(id, href, name) {
    return (
        `<li class="nav-item active">
                <a class="nav-link" data-id="${id}" href="${href}">${name}</a>
              </li>`);
}

export function navSimple(id, href, name) {
    return (
        `<li class="nav-item">
                <a class="nav-link" data-id="${id}" href="${href}">${name}</a>
              </li>`);
}

export function navFooter() {
    return (
        `</ul>
            <form data-id="search-form" class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>`);
}