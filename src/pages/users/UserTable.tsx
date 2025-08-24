import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Ban, Check, EllipsisVertical, EyeIcon, Pen, Trash, TriangleAlert } from "lucide-react"
import dayjs from 'dayjs/esm'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteUserProfile, getUserProfileById, updateUserStatus } from "@/lib/commonApi";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountStatus } from "@/utils/enums";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";


export function UserTable({ userData, isLoading, onUpdateUser, onDeleteUser }: any) {
    const navigate = useNavigate()
    const [_selectedUser, setSelectedUser] = useState<Record<string, any>>({})
    const [openOptionsId, setOpenOptionsId] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [deletingUser, setDeletingUser] = useState<Record<string, any>>({})
    const [dialogContent, setDialogContent] = useState<{
        type: keyof typeof AccountStatus | "";
        user: Record<string, any>;
        reason: string;
    }>({
        type: "",
        user: {},
        reason: "",
    });


    const getUserData = async (userId: any) => {
        try {
            const payload = {
                userId: userId
            }
            const res = await getUserProfileById(payload);
            navigate("/user/" + userId)
            setSelectedUser(res?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onDialogAction = (type: any, user: any) => {
        setDialogContent((prev) => ({
            ...prev,
            type,
            user,
        }));
        setOpenDialog(true)
    }

    const deleteUser = async () => {
        try {
            const userId = deletingUser?._id
            const payload = {
                userId: userId
            }
            const res = await deleteUserProfile(payload)
            if (res.statusCode === 200) {
                onDeleteUser()
                toast.success("User deleted successfully")
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateStatus = async () => {
        try {
            const payload = {
                userId: dialogContent?.user?._id,
                accountStatus: AccountStatus[dialogContent.type as keyof typeof AccountStatus],
                statusReason: dialogContent?.reason
            }
            const res = await updateUserStatus(payload)
            if (res.statusCode === 200) {
                setOpenDialog(false)
                setDialogContent({
                    type: "",
                    user: {},
                    reason: "",
                })
                onUpdateUser();
                toast.success("User status updated successfully")
            } else {
                toast.error("Something went wrong")
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                isLoading ?
                    <Card className="p-0 shadow-2xl border-1">
                        <div className="overflow-hidden rounded-md border">
                            <Table>
                                <TableHeader className="bg-accent">
                                    <TableRow>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">User</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Provider</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Verification</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Account Status</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Member Since</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Plan</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                            </Table>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton className="h-[74px] w-full mb-1 bg-accent rounded-none" key={index} >
                                    <Separator />
                                </Skeleton>
                            ))}
                        </div>
                    </Card>
                    :
                    <Card className="p-0 shadow-2xl border-1">
                        <div className="overflow-hidden rounded-md border">
                            <Table>
                                <TableHeader className="bg-accent">
                                    <TableRow>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">User</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Provider</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Verification</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Account Status</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Member Since</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Plan</TableHead>
                                        <TableHead className="whitespace-nowrap px-8 py-4 opacity-80 text-base">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userData.length > 0 ? (
                                        userData.map((user: any, index: number) => (
                                            <TableRow key={user._id || index} className="items-start">
                                                <TableCell className="whitespace-nowrap px-8 py-4 flex items-center gap-3">
                                                    <Avatar className="w-10.5 h-10.5">
                                                        <AvatarImage
                                                            className="object-cover"
                                                            src={user?.photos[0]?.fullUrl ?? "-"}
                                                            alt="@shadcn"
                                                        />
                                                        <AvatarFallback>{user?.name ?? "-"}</AvatarFallback>
                                                    </Avatar>
                                                    <p>{user?.name ?? "-"}</p>
                                                </TableCell>

                                                <TableCell className="whitespace-nowrap px-8 capitalize">
                                                    {user?.provider ?? "-"}
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap px-8">
                                                    {user?.verification?.verificationStatus ?? "-"}
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap px-8 capitalize">
                                                    {user?.accountStatus?.status ?? "-"}
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap px-8">
                                                    {dayjs(user?.createdAt).format("MMM DD YYYY") ?? "-"}
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap px-8">
                                                    {user?.plan ?? "Free"}
                                                </TableCell>

                                                <TableCell className="px-8">
                                                    <div className="flex justify-center items-start gap-3">
                                                        <EyeIcon
                                                            className="cursor-pointer"
                                                            size={18}
                                                            onClick={() => getUserData(user?._id)}
                                                        />
                                                        <Pen
                                                            className="cursor-pointer text-blue-400"
                                                            size={18}
                                                            onClick={() => navigate("/user/" + user?._id + "/edit")}
                                                        />
                                                        <Trash
                                                            className="cursor-pointer text-red-400"
                                                            size={18}
                                                            onClick={() => (setOpenDeleteDialog(true), setDeletingUser(user))}
                                                        />

                                                        <DropdownMenu
                                                            open={openOptionsId === user._id}
                                                            onOpenChange={(open) =>
                                                                setOpenOptionsId(open ? user._id : null)
                                                            }
                                                        >
                                                            <DropdownMenuTrigger asChild>
                                                                <EllipsisVertical className="cursor-pointer" size={18} />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent side="bottom"
                                                                align="end" sideOffset={6}>
                                                                <DropdownMenuItem
                                                                    className="flex justify-start items-center gap-4 cursor-pointer border-b-2 rounded-none"
                                                                    onClick={() => onDialogAction("active", user)}>
                                                                    <Check size={16} className="text-green-400" />
                                                                    <p className=" text-sm">Active Account</p>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="flexflex justify-start items-center gap-4 cursor-pointer  border-b-2 rounded-none"
                                                                    onClick={() => onDialogAction("suspend", user)}>
                                                                    <TriangleAlert size={16} className="text-yellow-400" />
                                                                    <p className=" text-sm">Suspend Account</p>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="flexflex justify-start items-center gap-4 cursor-pointer rounded-none"
                                                                    onClick={() => onDialogAction("ban", user)}>
                                                                    <Ban size={16} className="text-red-400" />
                                                                    <p className=" text-sm">Ban Account</p>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-4">
                                                No Data Found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="flex justify-start items-center gap-2">
                                        {dialogContent.type === "active" &&
                                            <Check size={20} className="text-green-400" />
                                        }
                                        {dialogContent.type === "suspend" &&
                                            <TriangleAlert size={20} className="text-yellow-400" />
                                        }
                                        {dialogContent.type === "ban" &&
                                            <Ban size={20} className="text-red-400" />
                                        }
                                        <p className=" capitalize">{dialogContent.type} Account</p>
                                    </DialogTitle>
                                    <DialogDescription>
                                        You are about to {dialogContent.type} {dialogContent.user.name}. They won't be able to access their account until you reactivate it.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center justify-between gap-2 py-3">
                                    <Label htmlFor="reason" className="">
                                        Reason
                                    </Label>
                                    <Textarea
                                        name="reason"
                                        cols={5}
                                        id="bio"
                                        placeholder="Type your reason here."
                                        className="w-[80%] h-18"
                                        value={dialogContent.reason}
                                        onChange={(e) => setDialogContent({ ...dialogContent, reason: e.target.value })}
                                    />
                                </div>
                                <DialogFooter className="sm:justify-end">
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline" className="cursor-pointer">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="default"
                                            onClick={updateStatus}
                                            className="cursor-pointer capitalize">
                                            {dialogContent.type} User
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                            <AlertDialogContent className="bg-accent">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete user account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className={'bg-destructive hover:bg-destructive/80 text-destructive-foreground'} onClick={deleteUser}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Card>
            }
        </>
    )
}
