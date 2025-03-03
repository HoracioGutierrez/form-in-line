import { getUserActiveQueues, type ActiveQueue } from "@/app/actions";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function ActiveQueuesList({ userId }: { userId: string }) {
  const activeQueues = await getUserActiveQueues(userId);

  if (activeQueues.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">You are not currently in any active queues.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {activeQueues.map((queue) => (
        <QueueCard key={queue.id} queue={queue} />
      ))}
    </div>
  );
}

function QueueCard({ queue }: { queue: ActiveQueue }) {
  const activeSinceText = queue.active_since
    ? formatDistanceToNow(new Date(queue.active_since), { addSuffix: true })
    : 'Unknown';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium text-gray-900">{queue.space_name}</h3>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {queue.is_current_speaker ? 'Speaking Now' : `Position: ${queue.position}`}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          Active {activeSinceText}
        </p>

        {queue.message && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700">Your message:</p>
            <p className="text-sm text-gray-600 italic">{queue.message}</p>
          </div>
        )}

        <div className="flex items-center mt-4 space-x-2">
          {queue.is_paused && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Paused
            </span>
          )}
          <Link
            href={`/spaces/${queue.slug}`}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Go to space →
          </Link>
        </div>
      </div>
    </div>
  );
}
