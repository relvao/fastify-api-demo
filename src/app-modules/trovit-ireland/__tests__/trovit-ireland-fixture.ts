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

const html = ' <!doctype html> <html class="no-js" lang=""> <head> <meta charset="utf-8"> <title>Just a Table</title> <meta name="description" content=""> <meta name="viewport" content="width=device-width,initial-scale=1"> </head> <body> <table> <thead> <th><a href="/?sortBy=id&sortOrder=desc" class="sort-asc">Id</a></th> <th><a href="/?sortBy=title&sortOrder=asc">Title</a> </th><th><a href="/?sortBy=url&sortOrder=asc">url</a> </th><th><a href="/?sortBy=city&sortOrder=asc">city</a> </th><th>Image</th> </thead><thead> </thead><tbody> <tr> <td>95504</td> <td>Spacious, fully furnished rooms for rent in a house with a garden in East Wall</td> <td>https://www.spotahome.com/dublin/for-rent:apartments/95504?utm_source=trovit&utm_medium=cffeeds&utm_campaign=normalads</td> <td>Dublin</td> <td><img src="https://d1052pu3rm1xk9.cloudfront.net/fsosw_960_540_verified_ur_6_50/d23616bb7057d6a95f955c32e1d482bb14845f031176a74d79cc72ad.jpg" alt="Front Garden"></td> </tr> <tr> <td>95539</td> <td>Furnished room for rent in a 2 bedroom apartment close to Phoenix Park, females only</td> <td>https://www.spotahome.com/dublin/for-rent:apartments/95539?utm_source=trovit&utm_medium=cffeeds&utm_campaign=normalads</td> <td>Dublin</td> <td><img src="https://d1052pu3rm1xk9.cloudfront.net/fsosw_960_540_verified_ur_6_50/16284d3cea4828fe607e61a8da465da14ff717188f474c159b81068e.jpg" alt="Living Room"></td> </tr> </tbody> </table> </body> </html> ';
export default {
  data, html
};
