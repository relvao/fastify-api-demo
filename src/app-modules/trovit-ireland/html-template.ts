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
      <body>${content}</body>
    </html>
  `
};

const buildTable = (content: string) => {
  return `
    <table>
      <thead>
        <th>Id</th>
        <th>Title</th>
        <th>Link</th>
        <th>City</th>
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

export const template = (data: Property[]) => {
  const minify = htmlMin.minify;

  return minify(
    buildLayout(buildTable(buildTableRows(data))),
    {
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: false
    }
  );
}

export default template;
