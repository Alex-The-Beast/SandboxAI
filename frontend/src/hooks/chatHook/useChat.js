import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllChannel,
  getChannelById,
  getMessagesByChannelId,
  sendMessage,
} from "../../api/chat";

export const useChatChannels = () =>
  useQuery({
    queryKey: ["channels"],
    queryFn: getAllChannel,
  });

export const useChatMessages = (channelId) =>
  useQuery({
    queryKey: ["messages", channelId],
    queryFn: () => getMessagesByChannelId(channelId),
    enabled: !!channelId,
  });

// export const useSendMessage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ message, userId, channelId }) =>
//       sendMessage(message, userId, channelId),
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries(["messages", variables.channelId]);
//       queryClient.invalidateQueries(["channels"]);
//     },
//   });
// };
