import { Property } from '../types';

const data: Property[] = [
  {
    "id": "95504",
    "url": "https://www.spotahome.com/dublin/for-rent:apartments/95504?utm_source=trovit&utm_medium=cffeeds&utm_campaign=normalads",
    "title": "Spacious, fully furnished rooms for rent in a house with a garden in East Wall",
    "city": "Dublin",
    "picture": {
      "url": "https://d1052pu3rm1xk9.cloudfront.net/fsosw_960_540_verified_ur_6_50/d23616bb7057d6a95f955c32e1d482bb14845f031176a74d79cc72ad.jpg",
      "title": "Front Garden"
    }
  },
  {
    "id": "95539",
    "url": "https://www.spotahome.com/dublin/for-rent:apartments/95539?utm_source=trovit&utm_medium=cffeeds&utm_campaign=normalads",
    "title": "Furnished room for rent in a 2 bedroom apartment close to Phoenix Park, females only",
    "city": "Dublin",
    "picture": {
      "url": "https://d1052pu3rm1xk9.cloudfront.net/fsosw_960_540_verified_ur_6_50/16284d3cea4828fe607e61a8da465da14ff717188f474c159b81068e.jpg",
      "title": "Living Room"
    },
  }
];

const html = ' <!doctype html> <html class="no-js" lang=""> <head> <meta charset="utf-8"> <title>Just a Table</title> <meta name="description" content=""> <meta name="viewport" content="width=device-width,initial-scale=1"> <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"> <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css"> <script defer="defer" src="https://code.getmdl.io/1.3.0/material.min.js"></script> <style> img {\n            width: 20vw;\n          } </style> </head> <body> <button id="download" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Download Data</button> <div class="mdl-grid"> <div class="mdl-cell mdl-cell--12-col"> <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp"> <thead> <th class="mdl-data-table__header--sorted-ascending"><a href="/?sortBy=id&sortOrder=desc">Id</a></th> <th class="mdl-data-table__cell--non-numeric"><a href="/?sortBy=title&sortOrder=asc">Title</a> </th><th class="mdl-data-table__cell--non-numeric"><a href="/?sortBy=city&sortOrder=asc">city</a> </th><th class="mdl-data-table__cell--non-numeric">Image</th> </thead><thead> </thead><tbody> <tr> <td>95504</td> <td>Spacious, fully furnished rooms for rent in a house with a garden in East Wall</td> <td>Dublin</td> <td> <a href="https://www.spotahome.com/dublin/for-rent:apartments/95504?utm_source=trovit&utm_medium=cffeeds&utm_campaign=normalads" target="_blank"><img src="https://d1052pu3rm1xk9.cloudfront.net/fsosw_960_540_verified_ur_6_50/d23616bb7057d6a95f955c32e1d482bb14845f031176a74d79cc72ad.jpg" alt="Front Garden"></a> </td> </tr> <tr> <td>95539</td> <td>Furnished room for rent in a 2 bedroom apartment close to Phoenix Park, females only</td> <td>Dublin</td> <td> <a href="https://www.spotahome.com/dublin/for-rent:apartments/95539?utm_source=trovit&utm_medium=cffeeds&utm_campaign=normalads" target="_blank"><img src="https://d1052pu3rm1xk9.cloudfront.net/fsosw_960_540_verified_ur_6_50/16284d3cea4828fe607e61a8da465da14ff717188f474c159b81068e.jpg" alt="Living Room"></a> </td> </tr> </tbody> </table> </div> <script src="http://danml.com/js/download.js"></script> <script> const butt = document.getElementById("download");\n          butt.addEventListener("click", function() {\n            let url = document.location.href;\n            return fetch(url, {\n              method: \'GET\',\n              headers: {\n                \'Accept\': \'application/json\'\n              }\n            })\n              .then(function(resp) {\n                return resp.blob();\n              })\n              .then(function(blob) {\n                download(blob);\n              });\n          }); </script> </div></body> </html> ';

export default {
  data, html
};
