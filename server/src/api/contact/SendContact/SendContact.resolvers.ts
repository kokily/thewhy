import { SendContactMutationArgs, SendContactResponse } from '../../../@types';
import { Resolvers } from '../../../@types/resolvers';
import SendMail from '../../../libs/sendmail';

const resolvers: Resolvers = {
  Mutation: {
    SendContact: async (
      _,
      args: SendContactMutationArgs
    ): Promise<SendContactResponse> => {
      try {
        await SendMail({ ...args });

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
    },
  },
};

export default resolvers;
