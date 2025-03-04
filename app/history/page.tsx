import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getHistoryData } from "@/app/actions";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";

import { Suspense } from "react";
import HistoryPagination from "./pagination";

async function getPageNumber(searchParams: { page?: string }): Promise<number> {
  const pageParam = searchParams.page;
  if (!pageParam) return 1;
  
  const page = parseInt(pageParam);
  return isNaN(page) || page < 1 ? 1 : page;
}

export default async function SessionHistoryPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const supabase = await createClient();
  const page = await getPageNumber(searchParams);
  const pageSize = 10;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { sessions, spaces, total } = await getHistoryData(user.id, page, pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Historial de Sesiones</h1>
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Este historial muestra todas las sesiones de tus espacios, incluyendo cuando fueron activados, 
          desactivados, y cuántas personas se unieron a la cola durante cada sesión.
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-muted/30 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No hay historial de sesiones disponible.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-muted/30 border border-gray-200 dark:border-muted rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Espacio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Desactivado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duración</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Participantes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-muted/20">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/spaces/${session.space_slug}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {session.space_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" title={format(new Date(session.activated_at), 'PPpp')}>
                      {formatDistanceToNow(new Date(session.activated_at), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.deactivated_at ? (
                        <span title={format(new Date(session.deactivated_at), 'PPpp')}>
                          {formatDistanceToNow(new Date(session.deactivated_at), { addSuffix: true })}
                        </span>
                      ) : (
                        <span className="text-green-600 dark:text-green-400">Activo</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.duration_minutes} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.queue_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <Suspense fallback={<div>Loading pagination...</div>}>
          <HistoryPagination 
            currentPage={page}
            totalItems={total}
            pageSize={pageSize}
          />
        </Suspense>
      </div>
    </div>
  );
}
