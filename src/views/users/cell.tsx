import React from "react";
import { Props } from "payload/components/views/Cell";
import "../../../globals.css";

export const UserCell: React.FC<Props> = (props) => {
  const { cellData }: any = props;

  if (!cellData) return null;

  let color = "bg-primary";

  switch (cellData) {
    case "active":
      color = "bg-primary";
      break;
    case "blocked":
      color = "bg-danger";
      break;
    default:
      color = "bg-muted text-white";
  }

  return (
    <div
      className={`${color} inline w-full rounded-xl p-2 text-center hover:cursor-pointer`}
    >
      {cellData}
    </div>
  );
};
