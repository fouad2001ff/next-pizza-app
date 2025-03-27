"use client";
import { Button } from '@/app/[locale]/components/ui/button'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { deleteUser } from '../_actions/user';

const DeleteUserButton = ({userId}: {userId: string}) => {
   const [state, setState] = useState<{
      pending: boolean;
      status: null | number;
      message: string;
    }>({
      pending: false,
      status: null,
      message: "",
    });
    const handleDelete = async (id: string) => {
      try {
        setState((prev) => {
          return { ...prev, pending: true };
        });
        const res = await deleteUser(id);
        setState((prev) => {
          return { ...prev, status: res.status, message: res.message };
        });
      } catch (error) {
        console.log(error);
      } finally {
        setState((prev) => {
          return { ...prev, pending: false };
        });
      }
    };
  return (
    <Button
      type="button"
      variant="outline"
      disabled={state.pending}
      onClick={() => handleDelete(userId)}
    >
      <Trash2 />
    </Button>
  )
}

export default DeleteUserButton