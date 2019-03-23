import htmlMin from 'html-minifier';
import { Property } from './types';

const buildLayout = (content: string) => {
  return `
    <!doctype html>
    <html class="no-js" lang="">
      <head>
        <meta charset="utf-8">
        <title>Just a Table</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
        <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
        <style>
          img {
            width: 20vw;
          }
        </style>
      </head>
      <body>
        <button id="download" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Download Data</button>
        ${content}
        <script src="http://danml.com/js/download.js"></script>
        <script>  
          const butt = document.getElementById("download");
          butt.addEventListener("click", function() {
            let url = document.location.href;
            return fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json'
              }
            })
              .then(function(resp) {
                return resp.blob();
              })
              .then(function(blob) {
                download(blob);
              });
          });
        </script>
      </body>
    </html>
  `
};

const getHeaderTitle = (field: string, label: string, sortBy: string, sortOrder: string) => {
  const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

  if (field !== sortBy) {
    return `<a href="/?sortBy=${field}&sortOrder=asc">${label}</a<`;
  }

  return `<a href="/?sortBy=${field}&sortOrder=${newSortOrder}">${label}</a>`;
}

const getClassSorting = (field: string, sortBy: string, sortOrder: string) => {
  if (field !== sortBy) {
    return '';
  }

  return sortOrder === 'asc' ? 'mdl-data-table__header--sorted-ascending' : 'mdl-data-table__header--sorted-descending';
}

const buildTable = (content: string, sortBy: string, sortOrder: string) => {
  return `
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <th class="${getClassSorting('id', sortBy, sortOrder)}">${getHeaderTitle('id', 'Id', sortBy, sortOrder)}</th>
          <th class="mdl-data-table__cell--non-numeric ${getClassSorting('title', sortBy, sortOrder)}">${getHeaderTitle('title', 'Title', sortBy, sortOrder)}</th>
          <th class="mdl-data-table__cell--non-numeric ${getClassSorting('city', sortBy, sortOrder)}">${getHeaderTitle('city', 'city', sortBy, sortOrder)}</th>
          <th class="mdl-data-table__cell--non-numeric">Image</th>
        <thead>
        <tbody>
          ${content}
        </tbody>
      </table>
      </div
    </div>
  `;
}

const buildTableRows = (data: Property[]) => {
  return data
    .map((item) => {
      return `
        <tr>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.city}</td>
          <td>
            <a href="${item.url}" target="_blank"><img src="${item.picture.url}" alt="${item.picture.title}" /></a>
          </td>
        </tr>
      `;
    })
    .join('');
}

interface TemplaArgs {
  data: Property[],
  sortBy: string,
  sortOrder: string
}

export const template = ({ data, sortBy, sortOrder }: TemplaArgs) => {
  const minify = htmlMin.minify;

  return minify(
    buildLayout(buildTable(buildTableRows(data), sortBy, sortOrder)),
    {
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: false
    }
  );
}

export default template;
