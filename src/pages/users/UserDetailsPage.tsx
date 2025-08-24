import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserProfileById } from '@/lib/commonApi'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs/esm'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const UserDetailsPage = () => {
    const navigate = useNavigate()
    const { userId } = useParams();
    const [userData, setUserData] = useState<Record<string, any>>({})
    const [isLoading, setIsLoading] = useState(false);

    const getUserData = async () => {
        setIsLoading(true)
        try {
            const payload = {
                userId: userId
            }
            const res = await getUserProfileById(payload);
            if (res.statusCode === 200 || res.statusCode === 304) {
                setIsLoading(false)
                setUserData(res?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserData()
    }, [])


    return (
        <div>
            <div className='flex gap-3 w-fit'>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => navigate(-1)}
                    className='cursor-pointer'
                ><ChevronLeft size={20} /></Button>
                <h1 className="text-3xl font-bold tracking-tight pb-4">User Detail</h1>
            </div>
            {
                isLoading ?
                    <div className='flex lg:flex-row flex-col justify-between gap-3'>
                        <div className='lg:w-[50%] flex flex-col gap-2' >
                            <Skeleton className="h-[590px]  rounded-xl shadow-2xl bg-card" />
                            <Skeleton className="h-[450px] rounded-xl shadow-2xl bg-card" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton className="h-[350px]  rounded-xl shadow-2xl bg-card" />
                            <Skeleton className="h-[350px] rounded-xl shadow-2xl bg-card" />
                        </div>
                    </div> :
                    <>
                        <div className='flex lg:flex-row flex-col justify-between gap-3'>
                            <div className='lg:w-[50%] flex flex-col gap-2'>
                                <Card className='shadow-2xl'>
                                    <CardHeader className="">
                                        <CardTitle className="flex justify-between">
                                            <p className='text-lg font-semibold'>Profile</p>
                                            <Badge variant={"outline"} className='text-sm'>{userData?.hasPremiumAccess ? "Premium" : "Free"}</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='w-full flex justify-center items-center flex-col gap-1'>
                                            <Avatar className="w-40 h-40 border-6 border-accent">
                                                <AvatarImage className="object-cover" src={userData?.photos && userData?.photos[0]?.fullUrl} alt="@shadcn" />
                                                <AvatarFallback>{userData?.name ?? "-"}</AvatarFallback>
                                            </Avatar>
                                            <p className='text-xl font-semibold'>{userData?.name}</p>
                                            <p className='text-base opacity-80'>{userData?.age} years old</p>
                                            <Badge variant={"outline"} className='text-sm'>{userData?.verification?.verificationStatus}</Badge>
                                        </div>

                                        <div className='pt-4'>
                                            <p className='text-base font-semibold opacity-70 pb-1'>Bio</p>
                                            <p className='text-sm'>{userData?.bio}</p>
                                        </div>

                                        <div className='pt-4'>
                                            <p className='text-base font-semibold opacity-70 pb-1'>Location</p>
                                            <p className='text-sm'>{userData?.location?.city}, {userData?.location?.state}, {userData?.location?.country}</p>
                                        </div>

                                        <div className='pt-4'>
                                            <p className='text-base font-semibold opacity-70 pb-1'>Member Since</p>
                                            <p className='text-sm'>{dayjs(userData?.createdAt).format("MMM DD YYYY")}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="w-full h-fit gap-1 shadow-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Gallery</CardTitle>
                                    </CardHeader>

                                    <CardContent className="mx-auto">
                                        <Carousel className="relative w-full max-w-xs">
                                            <CarouselContent>
                                                {userData?.photos?.map((image: any, index: number) => (
                                                    <CarouselItem key={index}>
                                                        <div className="p-0">
                                                            <Card className="p-0 border-none shadow-none">
                                                                <CardContent className="flex aspect-square items-center justify-center p-0">
                                                                    <img
                                                                        src={image.fullUrl}
                                                                        alt="Image"
                                                                        className="h-full w-full object-cover rounded-md"
                                                                    />
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>

                                            {/* keep buttons inside */}
                                            <CarouselPrevious
                                                variant="secondary"
                                                className="left-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                            />
                                            <CarouselNext
                                                variant="secondary"
                                                className="right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                            />

                                        </Carousel>
                                    </CardContent>
                                </Card>
                            </div>



                            <div className="w-full flex flex-col gap-2">
                                <Card className='gap-1 shadow-2xl'>
                                    <CardHeader>
                                        <CardTitle className='text-xl'>
                                            Personal Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 justify-between">
                                            <div className='pt-4'>
                                                <p className='text-sm opacity-70 pb-1'>Full Name</p>
                                                <p className='text-base font-semibold'>{userData?.name}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='text-sm  opacity-70 pb-1'>Email</p>
                                                <p className='font-semibold text-base'>{userData?.email ?? "Not Provided"}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='text-sm  opacity-70 pb-1'>Date of birth</p>
                                                <p className='font-semibold text-base'>{dayjs(userData?.dob).format("MMM DD YYYY")}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='text-sm  opacity-70 pb-1'>Relationship Goal</p>
                                                <p className='font-semibold text-base'>{userData?.relationshipGoals}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='text-sm  opacity-70 pb-1'>Gender</p>
                                                <p className='font-semibold text-base'>{userData?.gender}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='text-sm  opacity-70 pb-1'>Occupation</p>
                                                <p className='font-semibold text-base'>{userData?.occupation?.job}, {userData?.occupation?.company}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='text-sm  opacity-70 pb-1'>Looking For</p>
                                                <p className='font-semibold text-base'> {userData?.lookingForGender}</p>
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>

                                <Card className='w-full h-fit gap-1 shadow-2xl'>
                                    <CardHeader className=''>
                                        <CardTitle className='text-xl'>
                                            Lifestyle & Hobbies
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 justify-between">
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Drinking</p>
                                                <p className='text-base font-semibold'>{userData?.lifestyleAndHobbies?.drinking}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Children Preference</p>
                                                <p className='text-base font-semibold'>{userData?.lifestyleAndHobbies?.childrenPreference}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Smoking</p>
                                                <p className='text-base font-semibold'>{userData?.lifestyleAndHobbies?.smoking}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Pet Preference</p>
                                                {userData?.lifestyleAndHobbies?.petPreference.map((e: string) =>
                                                    <Badge variant={"secondary"} className='mr-2'>{e}</Badge>
                                                )}

                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Exercise Frequency</p>
                                                <p className='text-base font-semibold'>{userData?.lifestyleAndHobbies?.exerciseFrequency}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Tattoos</p>
                                                <p className='text-base font-semibold'>{userData?.lifestyleAndHobbies?.tattoos ? "Yes" : "No"}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Piercings</p>
                                                <p className='text-base font-semibold'>{userData?.lifestyleAndHobbies?.piercings ? "Yes" : "No"}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Vaccination Status</p>
                                                <p className='text-base font-semibold'>{userData?.lifestyleAndHobbies?.vaccinationStatus}</p>
                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className='w-full h-fit gap-1 shadow-2xl'>
                                    <CardHeader className=''>
                                        <CardTitle className='text-xl'>
                                            Beliefs & Education
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 justify-between">
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Zodiac Sign</p>
                                                <p className='text-base font-semibold'>{userData?.beliefs?.zodiac}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Religion</p>
                                                <p className='text-base font-semibold'>{userData?.beliefs?.religion}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Political View</p>
                                                <p className='text-base font-semibold'>{userData?.beliefs?.politicalViews}</p>
                                            </div>
                                            <div className='pt-4'>
                                                <p className='opacity-70 pb-1 text-sm'>Education</p>
                                                <p className='text-base font-semibold'>{userData?.beliefs?.education}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default UserDetailsPage
