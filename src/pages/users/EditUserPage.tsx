import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserProfileById, updateUserData } from '@/lib/commonApi'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MultiSelect } from '@/components/ui/multi-select'
import { Skeleton } from '@/components/ui/skeleton'
import { ChildrenPrefOptions, DrinkingOptions, EducationOptions, ExerciseOptions, PoliticalViewOptions, ReligionOptions, SmokingOptions, ZodiacSignOptions, type ChildrenPref, type Drinking, type Education, type Exercise, type PoliticalView, type Religion, type Smoking, type ZodiacSign } from '@/utils/enums'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

const petList = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Bird", label: "Bird" },
    { value: "Fish", label: "Fish" },
    { value: "Reptile", label: "Reptile" },
    { value: "Other", label: "Other" },
    { value: "No pets", label: "No pets" },
    { value: "Want pets", label: "Want pets" },
]


const EditUserPage = () => {
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

    const handleSave = async () => {
        console.log(userData)
        try {
            const res = await updateUserData({ ...userData, id: userData._id })
            if (res.statusCode === 200 || res.statusCode === 304) {
                setUserData(res?.data)
                toast.success("User info updated successfully")
            } else {
                toast.error("Something went wrong")
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='flex gap-3 w-fit'>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => navigate(-1)}
                    className='cursor-pointer'><ChevronLeft size={20} /></Button>
                <h1 className="text-3xl font-bold tracking-tight pb-4">Update User Info</h1>
            </div>
            {
                isLoading ?
                    <div className='flex justify-between gap-3'>
                        <div className='w-[50%] flex flex-col gap-2'>
                            <Skeleton className="h-[320px]  rounded-xl bg-card" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton className="h-[390px]  rounded-xl bg-card" />
                            <Skeleton className="h-[390px]  rounded-xl bg-card" />
                            <Skeleton className="h-[390px]  rounded-xl bg-card" />
                        </div>
                    </div> :
                    <>
                        <div className='flex justify-between gap-3'>
                            <div className='w-[50%] flex flex-col gap-2'>
                                <Card >
                                    <CardHeader>
                                        <CardTitle>
                                            <p className='text-lg font-semibold'>Profile Photo</p>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='w-full flex justify-center items-center flex-col gap-4'>
                                            <Avatar className="w-40 h-40 border-6 border-accent">
                                                <AvatarImage className="object-cover" src={userData?.photos && userData?.photos[0]?.fullUrl} alt="@shadcn" />
                                                <AvatarFallback>{userData?.name ?? "-"}</AvatarFallback>
                                            </Avatar>
                                            <Badge variant="secondary" className='px-2 py-1 text-base'>{userData?.hasPremiumAccess ? "Premium User" : "Free User"}</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <Card className='gap-1'>
                                    <CardHeader>
                                        <CardTitle className='text-xl'>
                                            Basic Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 justify-center">
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Full Name</p>
                                                <Input type="name" placeholder="Full Name"
                                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData?.name ?? "Not Provided"} />
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Age</p>
                                                <Input type="number" placeholder="age"
                                                    value={userData?.age ?? "Not Provided"}
                                                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                                                />
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Gender</p>
                                                <Select value={userData?.gender} onValueChange={(e) => setUserData({ ...userData, gender: e })}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any Gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Male">Male</SelectItem>
                                                            <SelectItem value="Female">Female</SelectItem>
                                                            <SelectItem value="LGTV+">LGTV+</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Height</p>
                                                <Input type="number" placeholder="Height" value={userData?.height ?? "Not Provided"}
                                                    onChange={(e) => setUserData({ ...userData, height: e.target.value })} />
                                            </div>
                                            <div className='pt-4 col-span-2'>
                                                <p className='text-sm opacity-70 pb-1'>Bio</p>
                                                <Textarea
                                                    name="Bio"
                                                    cols={5}
                                                    id="bio"
                                                    value={userData?.bio ?? "Not Provided"}
                                                    placeholder="Type your reason here."
                                                    className=""
                                                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                                <Card className='w-full h-fit gap-1'>
                                    <CardHeader className=''>
                                        <CardTitle className='text-xl'>
                                            Lifestyle & Hobbies
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 justify-center">
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Children Preference</p>
                                                <Select
                                                    onValueChange={(val: ChildrenPref) =>
                                                        setUserData({
                                                            ...userData,
                                                            lifestyleAndHobbies: {
                                                                ...userData.lifestyleAndHobbies,
                                                                childrenPreference: val,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.lifestyleAndHobbies?.childrenPreference}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {ChildrenPrefOptions.map((sign: any) => (
                                                            <SelectItem value={sign.value} key={sign.value}>{sign.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Drinking</p>
                                                <Select
                                                    onValueChange={(val: Drinking) =>
                                                        setUserData({
                                                            ...userData,
                                                            lifestyleAndHobbies: {
                                                                ...userData.lifestyleAndHobbies,
                                                                drinking: val,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.lifestyleAndHobbies?.drinking}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {DrinkingOptions.map((sign: any) => (
                                                            <SelectItem value={sign.value} key={sign.value}>{sign.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Exercise</p>
                                                <Select
                                                    onValueChange={(val: Exercise) =>
                                                        setUserData({
                                                            ...userData,
                                                            lifestyleAndHobbies: {
                                                                ...userData.lifestyleAndHobbies,
                                                                exerciseFrequency: val,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.lifestyleAndHobbies?.exerciseFrequency}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {ExerciseOptions.map((sign: any) => (
                                                            <SelectItem value={sign.value} key={sign.value}>{sign.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Smoking</p>
                                                <Select
                                                    onValueChange={(val: Smoking) =>
                                                        setUserData({
                                                            ...userData,
                                                            lifestyleAndHobbies: {
                                                                ...userData.lifestyleAndHobbies,
                                                                smoking: val,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.lifestyleAndHobbies?.smoking}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {SmokingOptions.map((sign: any) => (
                                                            <SelectItem value={sign.value} key={sign.value}>{sign.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Vaccination Status</p>
                                                <Select
                                                    onValueChange={(val: any) =>
                                                        setUserData({
                                                            ...userData,
                                                            lifestyleAndHobbies: {
                                                                ...userData.lifestyleAndHobbies,
                                                                vaccinationStatus: val,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.lifestyleAndHobbies?.vaccinationStatus}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Yes">Yes</SelectItem>
                                                            <SelectItem value="No">No</SelectItem>
                                                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Pets</p>
                                                <MultiSelect
                                                    list={petList}
                                                    defaultValues={userData?.lifestyleAndHobbies?.petPreference}
                                                    onChange={(e) => setUserData({
                                                        ...userData,
                                                        lifestyleAndHobbies: {
                                                            ...userData.lifestyleAndHobbies,
                                                            petPreference: e
                                                        },
                                                    })}
                                                />
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Tattoos</p>
                                                <Select
                                                    onValueChange={(val: any) =>
                                                        setUserData({
                                                            ...userData,
                                                            lifestyleAndHobbies: {
                                                                ...userData.lifestyleAndHobbies,
                                                                tattoos: val === "true" ? true : false,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.lifestyleAndHobbies?.tattoos?.toString()}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Piercings</p>
                                                <Select
                                                    onValueChange={(val: any) =>
                                                        setUserData({
                                                            ...userData,
                                                            lifestyleAndHobbies: {
                                                                ...userData.lifestyleAndHobbies,
                                                                piercings: val === "true" ? true : false,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.lifestyleAndHobbies?.piercings?.toString()}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className='w-full h-fit gap-1'>
                                    <CardHeader className=''>
                                        <CardTitle className='text-xl'>
                                            Beliefs & Education
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 justify-between">
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Zodiac Sign</p>
                                                <Select
                                                    onValueChange={(val: ZodiacSign) =>
                                                        setUserData({
                                                            ...userData,
                                                            beliefs: {
                                                                ...userData.beliefs,
                                                                zodiac: val,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.beliefs?.zodiac}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {ZodiacSignOptions.map((sign: any) => (
                                                                <SelectItem value={sign.value} key={sign.value}>{sign.label}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Religion</p>
                                                <Select
                                                    onValueChange={(val: Religion) =>
                                                        setUserData({
                                                            ...userData,
                                                            beliefs: {
                                                                ...userData.beliefs,
                                                                religion: val,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.beliefs?.religion}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {ReligionOptions.map((opt) => (
                                                            <SelectItem key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Political View</p>
                                                <Select
                                                    onValueChange={(val: PoliticalView) =>
                                                        setUserData({
                                                            ...userData,
                                                            beliefs: {
                                                                ...userData.beliefs,
                                                                politicalViews: val,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.beliefs?.politicalViews}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {PoliticalViewOptions.map((opt) => (
                                                            <SelectItem key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className='pt-4 w-[60%]'>
                                                <p className='text-sm opacity-70 pb-1'>Education</p>
                                                <Select
                                                    onValueChange={(val: Education) =>
                                                        setUserData({
                                                            ...userData,
                                                            beliefs: {
                                                                ...userData.beliefs,
                                                                education: val,
                                                            },
                                                        })
                                                    }
                                                    value={userData?.beliefs?.education}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select any option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {EducationOptions.map((opt) => (
                                                            <SelectItem key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex w-full justify-end gap-3 py-4">
                            <Button variant={"outline"} onClick={() => navigate(-1)} className='cursor-pointer'>Cancel</Button>
                            <Button onClick={handleSave} className='cursor-pointer'>Save Changes <Save /></Button>
                        </div>
                    </>
            }
        </div>
    )
}

export default EditUserPage
