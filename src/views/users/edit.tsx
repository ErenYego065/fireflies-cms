/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { AdminViewProps } from "payload/config";
import { format } from "date-fns";
//import { DialogConfirm } from "../../../src/components/dialog-confirm";

export const UserPreview = (props: AdminViewProps | any) => {
  const [media, setMedia] = useState<any>(null);
  const { data } = props;

  useEffect(() => {
    fetch("/api/media/" + data.image)
      .then((res) => res.json())
      .then((res) => setMedia(res));
  }, []);

  return (
    <>
      <div className="flex gap-4">
        <div className="flex w-1/4 flex-col gap-4">
          <div className="flex flex-col items-center gap-4 bg-secondary p-4">
            <img className="w-[285px]" src={media?.url} alt="user" />
            <div className="flex flex-row items-center gap-4">
              <button>Change Picture</button>
              <button>Remove Picture</button>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-secondary p-4">
            <h1 className="text-2xl font-bold">Action</h1>
            {/* <DialogConfirm */}
            {/*   triggerRef={<div>Reset Password</div>} */}
            {/*   message="Are you sure you want to reset this user's password?" */}
            {/* /> */}
            <button>Ban Account</button>
            <button>Block Account</button>
            <button>Delete Account</button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-1 bg-secondary p-4">
          <h3 className="text-2xl font-bold">User Information</h3>
          <div>
            <label>Full Name</label>
            <p>{data.name}</p>
          </div>
          <div>
            <label>Email Address</label>
            <p>{data.email}</p>
          </div>
          <div>
            <label>Connected Wallet Address</label>
            <p>{"0x1234567890abcdef1234567890abcdef12345678"}</p>
          </div>
          <div>
            <label>Registration Date</label>
            <p>{format(data.createdAt, "yyyy-MM-dd")}</p>
          </div>
          <div>
            <label>Account Status</label>
            <p>{data.status}</p>
          </div>
        </div>
      </div>
    </>
  );
};
