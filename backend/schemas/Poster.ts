import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Poster = list({
  // TODO access
  fields: {
    headliner: text({ isRequired: true }),
    venue: text({ isRequired: true }),
    supportingActs: text(),
    date: text(),
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
