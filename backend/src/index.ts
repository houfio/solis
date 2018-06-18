import { getRepository } from 'typeorm';
import { bootstrap } from 'vesper';

import { PageBlockData } from './entity/PageBlockData';
import { Token } from './entity/Token';
import { User } from './entity/User';

const debug = true;
const port = Number(process.env.PORT || 8000);

bootstrap({
  port,
  graphQLRoute: '/api',
  graphIQLRoute: process.env.NODE_ENV !== 'production' && '/browse',
  playground: false,
  controllers: [ __dirname + '/controller/**/*.js' ],
  resolvers: [ __dirname + '/resolver/**/*.js' ],
  schemas: [ __dirname + '/schema/**/*.graphql' ],
  setupContainer: async (container, action) => {
    if (action.request && (action.request.headers.authorization || debug)) {
      const repo = getRepository(Token);
      const token = await repo.findOne(action.request.headers.authorization);

      if (!token || token.deleted) {
        throw new Error('Unauthorized');
      }

      token.lastUsed = new Date();

      await repo.save(token);

      container.set(User, await token.user);
    }
  },
  customResolvers: {
    PageBlockData: {
      __resolveType: async (obj: PageBlockData) => {
        if (await obj.target) {
          return 'Button';
        } else if (obj.text) {
          return 'Text';
        } else if (obj.height) {
          return 'Hero';
        } else if (obj.image) {
          return 'Image';
        } else if (obj.size) {
          return 'Column';
        }

        return;
      }
    }
  }
}).then(() => {
  console.log(`Solis is up and running on http://localhost:${port}/`);
}).catch((error: any) => {
  console.error(error);
});
