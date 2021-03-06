import { getRepository } from 'typeorm';
import { AddNoticeMutationArgs, AddNoticeResponse } from '../../../@types';
import { Resolvers } from '../../../@types/resolvers';
import authResolver from '../../../libs/authenticate';
import Notice from '../../../entities/Notice';

const resolvers: Resolvers = {
  Mutation: {
    AddNotice: authResolver(
      async (_, args: AddNoticeMutationArgs): Promise<AddNoticeResponse> => {
        try {
          const count = await getRepository(Notice).count();
          const notice = await getRepository(Notice).create({
            ...args,
            num: count + 1,
          });

          await notice.save();

          return {
            ok: true,
            error: null,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
