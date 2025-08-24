import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, UserCheck, Users, UserX } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { systemMetrics } from '@/lib/commonApi'
import { Skeleton } from '@/components/ui/skeleton'
import { useNavigate } from 'react-router-dom'

export function Dashboard() {
  const navigate = useNavigate()
  const [dashboardData, setdashboardData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    try {
      const res = await systemMetrics();
      if (res.statusCode === 200 || res.statusCode === 304) {
        setLoading(false)
        setdashboardData(res.data);
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const findPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(2);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {loading ? (
        <div className="flex lg:flex-row flex-col justify-between gap-4">
          <Skeleton className="h-[160px] w-full rounded-xl bg-card shadow-2xl" />
          <Skeleton className="h-[160px] w-full rounded-xl bg-card shadow-2xl" />
          <Skeleton className="h-[160px] w-full rounded-xl bg-card shadow-2xl" />
          <Skeleton className="h-[160px] w-full rounded-xl bg-card shadow-2xl" />
        </div>
      ) : (
        <div className="flex lg:flex-row flex-col gap-4">
          <Card className='w-full shadow-2xl'>
            <CardHeader>
              <CardTitle className='flex justify-between items-baseline'>
                <div className='text-base font-semibold opacity-80'>Total Users</div>
                <Users className='opacity-80' size={18} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-semibold'>{dashboardData?.totalUsers}</p>
            </CardContent>
          </Card>

          <Card className='w-full shadow-2xl'>
            <CardHeader>
              <CardTitle className='flex justify-between items-baseline'>
                <div className='text-base font-semibold opacity-80'>Active Users</div>
                <UserCheck className='text-green-500' size={18} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-semibold'>{dashboardData?.totalActiveUsers}</p>
              <p className='text-base opacity-80'>
                {findPercentage(dashboardData?.totalActiveUsers, dashboardData?.totalUsers)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className='w-full shadow-2xl'>
            <CardHeader>
              <CardTitle className='flex justify-between items-baseline'>
                <div className='text-base font-semibold opacity-80'>Inactive Users</div>
                <UserX className='text-red-500' size={18} />

              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-semibold'>{dashboardData?.totalInactiveUsers}</p>
              <p className='text-base opacity-80'>
                {findPercentage(dashboardData?.totalInactiveUsers, dashboardData?.totalUsers)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className='w-full shadow-2xl'>
            <CardHeader>
              <CardTitle className='flex justify-between items-baseline'>
                <div className='text-base font-semibold opacity-80'>Premium Users</div>
                <Star className='text-yellow-500' size={18} />

              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-semibold'>{dashboardData?.totalPremiumUsers}</p>
              <p className='text-base opacity-80'>
                {findPercentage(dashboardData?.totalPremiumUsers, dashboardData?.totalUsers)}% of total
              </p>
            </CardContent>
          </Card>
        </div>
      )
      }

      <div className='flex lg:flex-row flex-col gap-4'>
        <div className='xl:w-[60%] lg:w-[50%] w-full'>
          <div className="flex justify-between items-baseline px-2">
            <p className='text-2xl font-semibold py-4'>
              Latest Users
            </p>
            <p className='text-base opacity-80 cursor-pointer' onClick={() => navigate("/users")}>
              View All
            </p>
          </div>

          {loading ?
            <Skeleton className="h-[340px] w-full rounded-xl bg-card shadow-2xl" />
            :
            <Card className='shadow-2xl'>
              <CardHeader>
                <CardTitle className='flex justify-between items-baseline'>
                  <div className='text-lg font-semibold'>Recently registered</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead >Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead >Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData?.latestUsers?.map((users: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell >{users.name}</TableCell>
                        <TableCell >{users.age}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className='px-4'> {users.gender}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className='bg-accent'> {users.isSuspended ? "Inactive" : "Active"}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          }

        </div>

        <div className='xl:w-[30%] lg:w-[50%] w-full'>
          <div className="flex justify-between items-baseline px-2">
            <p className='text-2xl font-semibold py-4'>
              Quick Stats
            </p>
          </div>
          {loading ?
            <Skeleton className="h-[350px] w-full rounded-xl bg-card shadow-2xl" />
            :
            <Card className='shadow-2xl'>
              <CardHeader>
                <CardTitle className='flex justify-between items-baseline'>
                  <div className='text-lg font-semibold'>Platform Health</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div >
                  <div className="flex justify-between py-2">
                    <p className="text-base opacity-80">User Engagement</p>
                    <p className="text-base"> {findPercentage(dashboardData?.totalActiveUsers, dashboardData?.totalUsers)}%</p>
                  </div>
                  <Progress
                    value={Number(findPercentage(dashboardData?.totalActiveUsers, dashboardData?.totalUsers))} className='[&>div]:bg-green-500 bg-accent' />
                </div>

                <div className='py-2'>
                  <div className="flex justify-between py-2">
                    <p className="text-base opacity-80">Premium Conversion</p>
                    <p className="text-base"> {findPercentage(dashboardData?.totalPremiumUsers, dashboardData?.totalUsers)}%</p>
                  </div>
                  <Progress
                    value={Number(findPercentage(dashboardData?.totalPremiumUsers, dashboardData?.totalUsers))}
                    className='[&>div]:bg-green-500 bg-accent' />
                </div>

                <Separator className='my-4' />

                <div className='py-2'>
                  <p className="text-base pb-2">User Distribution</p>
                  <div className="flex justify-between py-2">
                    <div className='text-center'>
                      <p className='text-sm'>{dashboardData?.totalActiveUsers}</p>
                      <p className='text-xs opacity-80'>Active</p>
                    </div>
                    <div className='text-center'>
                      <p className='text-sm'>{dashboardData?.totalInactiveUsers}</p>
                      <p className='text-xs opacity-80'>Inactive</p>
                    </div>
                    <div className='text-center'>
                      <p className='text-sm'>{dashboardData?.totalPremiumUsers}</p>
                      <p className='text-xs opacity-80'>Premium</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          }

        </div>
      </div>

    </div>
  )
}
