import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

export const User = list({
  // access:
  // ui:
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    affiliation: text({ isRequired: true}),
    reason: text({ isRequired: true}),
    role: relationship({
      ref: 'Role.assignedTo'
    })
  },
});
