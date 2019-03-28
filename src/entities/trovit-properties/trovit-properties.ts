import * as t from 'io-ts';

// we require id, title, link, city and main image
export const TrovitProperties = t.interface({
  trovit: t.interface({
    ad: t.array(
      t.interface({
        id: t.string,
        title: t.string,
        url: t.string,
        city: t.string,
        pictures: t.interface({
          picture: t.array(t.interface({
            picture_url: t.string,
            picture_title: t.string
          }))
        })
      })
    )
  })
});

export type TrovitProperties = t.TypeOf<typeof TrovitProperties>;

export default TrovitProperties;
