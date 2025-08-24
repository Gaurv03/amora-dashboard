import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserTable } from './UserTable';
import { userProfiles } from '@/lib/commonApi';
import {
    Pagination,
    PaginationContent,

    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import debounce from 'lodash.debounce';
type PaginationType = {
    page: number
    limit: number
    total: number
    totalPages: number
}


export function Users() {
    const [query, setQuery] = useState('');
    const [userData, setUserData] = useState<Array<Record<string, any>>>([])
    const [pagination, setPagination] = useState<PaginationType>({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    })
    const [loading, setLoading] = useState(false)

    const getUserData = async (isUpdating: boolean = false, search: string = "", page: number = 1) => {
        !isUpdating && setLoading(true)
        try {
            const payload = {
                search: search,
                page: page,
                pageSize: 10
            }
            const res = await userProfiles(payload)
            if (res.statusCode === 200 || res.statusCode === 304) {
                setLoading(false)
                setUserData(res?.data?.userProfiles)
                setPagination(res?.pagination)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData(false, query, pagination.page)
    }, [pagination.page])


    const debouncedSearch = useRef(
        debounce((q) => {
            getUserData(false, q);
        }, 500)
    ).current;

    useEffect(() => {

        debouncedSearch(query);

        return () => {
            debouncedSearch.cancel();
        };
    }, [query, debouncedSearch]);

    const handleUpdateUser = () => {
        getUserData(true)
    };
    const handleDeleteUser = () => {
        getUserData(true)
    };
    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className="space-y-6">
            <div className='flex justify-between'>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground py-3">
                        Showing {(pagination?.page - 1) * 10 + 1} - {Math.min(pagination?.page * 10, pagination?.total)} of 23 users
                    </p>
                </div>
                <div className='flex gap-2'>
                    <div className="flex-1 max-w-md  relative w-full">
                        <Search className="absolute left-3 top-[22%] -translate-y-1/2 w-4 h-4" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name or email"
                            className="pl-10 dark:bg-background-accent border text-xs focus-visible:ring-0 bg-accent"
                        />
                    </div>
                    <Button >Search</Button>
                </div>
            </div>
            <div>
                <UserTable
                    userData={userData}
                    isLoading={loading}
                    onUpdateUser={handleUpdateUser}
                    onDeleteUser={handleDeleteUser}
                />
                <Pagination className='py-4'>
                    <PaginationContent>
                        <PaginationItem className='cursor-pointer'>
                            <PaginationPrevious
                                onClick={() =>
                                    pagination.page > 1 &&
                                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                                }
                            />
                        </PaginationItem>

                        {Array.from({ length: pagination.totalPages }).map((_, i) => (
                            <PaginationItem key={i} className='cursor-pointer'>
                                <PaginationLink
                                    isActive={pagination.page === i + 1}
                                    onClick={() => setPagination((prev) => ({ ...prev, page: i + 1 }))}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem className='cursor-pointer'>
                            <PaginationNext
                                onClick={() =>
                                    pagination.page < pagination.totalPages &&
                                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </div>

        </div>
    )
}
