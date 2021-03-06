import * as common from './commons.js'

export default class MainPage {
    constructor(context) {
        this._context = context;
        this._rootEl = context.rootEl();
    }

    init() {
        this._rootEl.innerHTML = `<div class="container">` +
            common.brand() +
            common.navActive("menu-main", "/main", "Shop") +
            common.navSimple("menu-news", "/news", "Newsfeed") +
            common.navSimple("menu-messages", "/messages", "Messages") +
            common.navSimple("menu-admin", "/admin/main", "Turn to admin") +
            common.navFooter() +
            `<div class="row" data-id="items-container">
        </div>
      </div> 
      <!-- TODO: https://getbootstrap.com/docs/4.4/components/modal/ -->
      <div class="modal fade" data-id="error-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Error!</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div data-id="error-message" class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

        this._rootEl.querySelector('[data-id=menu-main]').addEventListener('click', evt => {
            evt.preventDefault();
        });
        this._rootEl.querySelector('[data-id=menu-news]').addEventListener('click', evt => {
            evt.preventDefault();
            this._context.route(evt.currentTarget.getAttribute('href'));
        });
        this._rootEl.querySelector('[data-id=menu-messages]').addEventListener('click', evt => {
            evt.preventDefault();
            this._context.route(evt.currentTarget.getAttribute('href'));
        });
        this._rootEl.querySelector('[data-id=menu-admin]').addEventListener('click', evt => {
            evt.preventDefault();
            this._context.route(evt.currentTarget.getAttribute('href'));
        });

        this._errorModal = $('[data-id=error-modal]'); // jquery
        this._errorMessageEl = this._rootEl.querySelector('[data-id=error-message]');

        this._itemsContainerEl = this._rootEl.querySelector('[data-id=items-container]');

        this.loadAll();
        this.pollNewItems();
    }

    loadAll() {
        this._context.get('/items', {},
            text => {
                const items = JSON.parse(text);
                this.rebuildList(items);
            },
            error => {
                this.showError(error);
            });
    }

    rebuildList(items) {
        this._itemsContainerEl.innerHTML = '';
        for (const item of items) {
            const itemEl = document.createElement('div');
            itemEl.className = 'col-4';

            itemEl.innerHTML = `
        <div class="card mt-2">
          <img src="${item.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">${item.name}</p>
            <p class="card-text">Desc: ${item.description}</p>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col">
                <a href="#" data-action="more" class="btn btn-sm btn-primary">More</a>
                <a href="#" data-action="buy" class="btn btn-sm btn-danger">Buy</a>
              </div>
            </div>
          </div>
        </div>
      `;

            this._itemsContainerEl.appendChild(itemEl);
        }
    }

    pollNewItems() {
        this._timeout = setTimeout(() => {
            this.loadAll();
            this.pollNewItems();
        }, 5000);
    }

    showError(error) {
        const data = JSON.parse(error);
        const message = this._context.translate(data.message);
        this._errorMessageEl.textContent = message;
        this._errorModal.modal('show');
    }

    destroy() {
        clearTimeout(this._timeout);
    }
}
