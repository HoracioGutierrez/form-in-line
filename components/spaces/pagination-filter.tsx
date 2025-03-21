"use client"
import { useQueryState, parseAsString } from 'nuqs'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PaginationFilterProps = {
    dataLength: number
}

export default function PaginationFilter({ dataLength }: PaginationFilterProps) {

    const [page, setPage] = useQueryState("page", { ...parseAsString.withDefault("1"), shallow: false })
    const [limit, setLimit] = useQueryState("limit", { ...parseAsString.withDefault("10"), shallow: false })
    const pagesAmount = Math.ceil(dataLength / parseInt(limit))

    return (
        <div className="flex gap-2 justify-center items-center">
            <Select onValueChange={(value) => { setLimit(value) }} defaultValue={limit}>
                <SelectTrigger>
                    <SelectValue placeholder={10} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">{1}</SelectItem>
                    <SelectItem value="5">{5}</SelectItem>
                    <SelectItem value="10">{10}</SelectItem>
                    <SelectItem value="20">{20}</SelectItem>
                    <SelectItem value="50">{50}</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex gap-2 items-center">
                <Button
                    onClick={() => setPage((parseInt(page) - 1).toString())}
                    size="sm"
                    variant={"secondary"}
                    disabled={page === "1"}
                    className={cn(page === "1" && "bg-primary text-primary-foreground")}
                >
                    <ArrowLeft />
                </Button>
                {Array.from({ length: pagesAmount }, (_, index) => (
                    <Button
                        key={index}
                        onClick={() => setPage((index + 1).toString())}
                        size="sm"
                        variant={"secondary"}
                        className={cn(page === (index + 1).toString() && "bg-primary text-primary-foreground")}
                    >
                        {index + 1}
                    </Button>
                ))}
                <Button
                    onClick={() => setPage((parseInt(page) + 1).toString())}
                    size="sm"
                    variant={"secondary"}
                    disabled={page === pagesAmount.toString()}
                    className={cn(page === pagesAmount.toString() && "bg-primary text-primary-foreground")}
                >
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}