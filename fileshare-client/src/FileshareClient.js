import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';

export class FileshareClient extends LitElement {
  static get properties() {
    return {
      files: { type: Array },
      toasterMessage: { type: String },
    };
  }

  static get styles() {
    return css`
      main {
        padding: 20px;
        flex-grow: 1;
        font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
      }

      .file__container {
        display: flex;
        flex-flow: row wrap;
        margin-top: 50px;
      }

      .file-block__container {
        height: 180px;
        width: 180px;
        margin: 8px;
        padding: 10px 20px;
        border-radius: 10px;
        box-shadow: 3px 5px 10px;
        font-size: 14px;
      }

      .file-block__container header {
        height: 70%;
      }

      .file-block__container footer {
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .file-block__container footer p {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .delete-file {
        float: right;
      }

      .upload-file {
        margin-top: 15px;
        height: 50px;
        width: 215px;
      }
    `;
  }

  get toaster() {
    return this.shadowRoot.getElementById('toaster');
  }

  constructor() {
    super();
    this.files = [];
    this.toasterMessage = 'An error occured.';
  }

  async connectedCallback() {
    super.connectedCallback();

    await this.fetchFiles();
  }

  render() {
    return html`
      <main>
        <input class="file-input" type="file" name="sfile" id="sfile"/>
        <br/>
        <paper-button
          raised
          class="upload-file"
          @click=${this.uploadFile}
        >
          Upload New File
        </paper-button>

        <section class="file__container">
          ${this.files.map((file) => html`
            <section class="file-block__container">
              <header>
                <paper-icon-button
                  icon="close"
                  @click=${() => this.deleteFile(file)}
                  class="delete-file"
                ></paper-icon-button>
                </header>
                <footer>
                  <p> ${file.originalname} </p>
                  <paper-icon-button
                    icon="file-download"
                    class="download-file"
                    @click=${() => this.downloadFile(file)}
                  ></paper-icon-button>
                </footer>
            </section>
          `,)}
        </section>

        <paper-toast id="toaster" text=${this.toasterMessage}></paper-toast>

        <paper-button>
          Use Google Cloud Storage
        </paper-button>
      </main>
    `;
  }

  async deleteFile(file) {
    const response = await fetch(`http://localhost:8080/files/${file.publicKey}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if(data.code !== 200) {
      this.toasterMessage = data.error;
      this.toaster.open();
      return;
    }

    await this.fetchFiles();
  }


  async downloadFile(file) {
    window.open(`http://localhost:8080/files/${file.publicKey}`);
  }

  async uploadFile(e) {
    e.preventDefault();

    const file = this.shadowRoot.getElementById('sfile').files[0];
    const formData = new FormData();

    formData.append('sfile', file)

    const response = await fetch('http://localhost:8080/files', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if(data.code !== 200) {
      this.toasterMessage = data.error;
      this.toaster.open();
    }

    await this.fetchFiles();
  }

  async fetchFiles() {
    const result = await fetch('http://localhost:8080/files', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
      }
    });
    const { data } = await result.json();

    this.files = data;
  }
}
