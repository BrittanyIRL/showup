import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Poster = list({
  // TODO access
  fields: {
    headliner: text({ isRequired: true }),
    venue: text({ isRequired: true }),
    supportingActs: text(),
    date: text({ isRequired: true }),
    creator: text({ isRequired: true }),
    createdDate: text({ isRequired: true }),
    city: text({ isRequired: true }),
    state: text({ isRequired: true }),
    artist: text({ isRequired: true }),
    image: relationship({
      ref: 'PosterImage.poster',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
  },
});
