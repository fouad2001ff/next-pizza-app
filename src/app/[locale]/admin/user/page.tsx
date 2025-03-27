import { getUsers } from '@/server/db/users';
import React from 'react'
import Link from '../../components/link';
import { getCurrentLocale } from '@/lib/get-locale-in-server';
import { Pages, Routes } from '@/constants/enums';
import { buttonVariants } from '../../components/ui/button';
import { Edit } from 'lucide-react';
import DeleteUserButton from './_components/DeleteUserButton';

const UsersPage = async () => {
  const locale = await getCurrentLocale();
  const users = await getUsers();
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <ul className="flex flex-col gap-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex-between bg-gray-100 p-4  rounded-md"
              >
                <h3>{user.name}</h3>
                <p>{user.email}</p>

                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`}
                    className={`${buttonVariants({ variant: "outline" })}`}
                  >
                    <Edit />
                  </Link>
                  <DeleteUserButton userId={user.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default UsersPage