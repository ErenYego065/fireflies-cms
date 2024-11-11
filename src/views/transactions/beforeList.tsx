import React from "react";
import "../../../globals.css";

export const BeforeList: React.ComponentType<any> = () => {
  const path = window.location.pathname.split("/").at(-1);

  const COLLECTIONS = [
    {
      name: "Transactions",
      url: "transactions",
    },
    {
      name: "Reward History",
      url: "rewardsHistory",
    },
  ];

  return (
    <div className="flex flex-row gap-4 p-4">
      {COLLECTIONS.map((collection) => (
        <a
          href={`/admin/collections/${collection.url}?limit=10`}
          className={`hover:bg-primary-dark rounded-lg p-2 text-xl text-white hover:cursor-pointer ${path === collection.url ? "underline" : "no-underline"}`}
        >
          {collection.name}
        </a>
      ))}
    </div>
  );
};
