import React from 'react';

import { HomePage } from '@keystone-next/admin-ui/pages/HomePage';
import { gql } from '@keystone-next/admin-ui/apollo';

export default function Home() {
  return (
    <HomePage
      query={gql`
        query {
          keystone {
            adminMeta {
              lists {
                key
                fields {
                  path
                  createView {
                    fieldMode
                  }
                }
              }
            }
          }
          User: _allUsersMeta {
            count
          }
          Poster: _allPostersMeta {
            count
          }
          PosterImage: _allPosterImagesMeta {
            count
          }
          Role: _allRolesMeta {
            count
          }
        }
      `}
    />
  );
}
