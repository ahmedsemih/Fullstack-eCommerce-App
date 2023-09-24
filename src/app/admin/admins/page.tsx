import AdminButton from '@/components/buttons/AdminButton';
import React from 'react'
import { IoMdAddCircle } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

async function fetchAdmins() {
    const res = await fetch(`${process.env.BASE_URL}/api/users`, { cache: 'no-cache' });
    const data = await res.json();

    return data.users;
}   

const Admins = async () => {
    const companyUsers:User[] = await fetchAdmins();
    return (
        <main className='min-h-[400px]'>
            <table className="w-full mt-5 text-black table-fixed">
                <thead className="bg-mainGreen border-2 text-white py-4 border-mainGreen">
                    <tr>
                        <th className='py-3'>Full Name</th>
                        <th>Email</th>
                        <th>Provider</th>
                        <th>Status</th>
                        <th>
                            <AdminButton userId={null}>
                                <IoMdAddCircle />
                            </AdminButton>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        companyUsers?.map((user) => (
                            <tr className='border-2 border-mainGreen text-center'>
                                <td className='p-2'>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.provider}</td>
                                <td>{user.isAdmin ? 'admin' : 'user'}</td>
                                <td>
                                    <AdminButton userId={user._id}>
                                        <MdEdit/>
                                    </AdminButton>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </main>
    )
}

export default Admins;