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
      </head>    
      <body>
        <button id="download">Download Data</button>
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

  return `<a href="/?sortBy=${field}&sortOrder=${newSortOrder}" class="sort-${sortOrder}">${label}</a>`;
}

const buildTable = (content: string, sortBy: string, sortOrder: string) => {
  return `
    <table>
      <thead>
        <th>${getHeaderTitle('id', 'Id', sortBy, sortOrder)}</th>
        <th>${getHeaderTitle('title', 'Title', sortBy, sortOrder)}</th>
        <th>${getHeaderTitle('url', 'url', sortBy, sortOrder)}</th>
        <th>${getHeaderTitle('city', 'city', sortBy, sortOrder)}</th>
        <th>Image</th>
      <thead>
      <tbody>
        ${content}
      </tbody>
    </table>
  `;
}

const buildTableRows = (data: Property[]) => {
  return data
    .map((item) => {
      return `
        <tr>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.url}</td>
          <td>${item.city}</td>
          <td><img src="${item.picture.url}" alt="${item.picture.title}" /></td>
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
