import { ThreadModel } from "@/services/schema";
import { InfinitySpin } from "react-loader-spinner";
import Thread from "./thread";

type ThreadListProps = {
  threads: ThreadModel[];
  loading: boolean;
  error: boolean;
  handleDelete: (id: string) => Promise<void>;
};

const ThreadList = (props: ThreadListProps) => {
  return (
    <div
      className={`flex-1 flex flex-col p-2 space-y-2 transition-all ${
        props.loading || props.threads == null
          ? "justify-center items-center"
          : ""
      }`}
    >
      {props.loading ? (
        <InfinitySpin color="grey" />
      ) : props.threads ? (
        props.threads.map((thread) => (
          <Thread
            key={thread.id}
            thread={thread}
            onDelete={props.handleDelete}
          />
        ))
      ) : (
        <h1 className="m-2 text-center  text-gray-400">
          {props.error ? "Failed to fetch posts :/" : "No comments found"}
        </h1>
      )}
    </div>
  );
};

export default ThreadList;
