import path from "path";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import { Blogs } from "./collections/Blogs";
import { Media } from "./collections/Media";
import { Document } from "./collections/Documents";
import { Glossaries } from "./collections/Glossaries";
import { Faqs } from "./collections/Faqs";
import { Articles } from "./collections/Articles";
import { Submissions } from "./collections/Submissions";
import { Transactions } from "./collections/Transactions";
import { RewardsHistory } from "./collections/RewardsHistory";
import { UserPreview } from "./views/users/edit";
import { Raffles } from "./collections/Raffles";
import { RaffleDashboard } from "./collections/RaffleDashboard";
import { Tickets } from "./collections/Tickets";
import { Winners } from "./collections/Winners";

export default buildConfig({
  admin: {
    css: path.resolve(__dirname, "stylesheet.scss"),
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      views: {
        RaffleDashboard: {
          Component: UserPreview,
          path: "/raffle-dashboard",
        },
      },
    },
  },
  email: {
    transportOptions: {
      host: process.env.SMTP_HOST || "smtp.resend.com",
      auth: {
        user: process.env.SMTP_USER || "resend",
        pass: process.env.SMTP_PASS || "re_dGJB64nv_JiRbxdnM7iox89Gbm5C8nsQD",
      },
      port: Number(process.env.SMTP_HOST) || 587,
      secure: false,
      requireTLS: true,
    },
    fromName: "Fireflies Support",
    fromAddress: "noreply@notification.firefliestoken.com",
  },
  editor: slateEditor({}),
  cors: "*",
  csrf: ["http://localhost:3002", "https://cms-admin.firefliestoken.com"],
  collections: [
    Users,
    Blogs,
    Media,
    Document,
    Glossaries,
    Faqs,
    Articles,
    Submissions,
    Transactions,
    RewardsHistory,
    Raffles,
    Tickets,
    Winners,
    RaffleDashboard,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
});
