import { getUserSpaces } from '@/app/actions'
import SpaceCard from './SpaceCard'


interface SpacesListProps {
  userId: string
}

export default async function SpacesList({ userId }: SpacesListProps) {
  const spaces = await getUserSpaces(userId)

  if (spaces.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-muted rounded-lg">
        <p className="text-gray-500 dark:text-white/50">
          Aún no has creado ningún espacio.
          ¡Crea tu primer espacio para comenzar!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {spaces.map((space) => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  )
}
