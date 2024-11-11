/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    blogs: Blog;
    media: Media;
    documents: Document;
    glossaries: Glossary;
    faqs: Faq;
    articles: Article;
    submissions: Submission;
    transactions: Transaction;
    rewardsHistory: RewardsHistory;
    "payload-preferences": PayloadPreference;
    "payload-migrations": PayloadMigration;
  };
  globals: {};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  image?: string | Media | null;
  role?: ("admin" | "user") | null;
  name: string;
  provider?: string | null;
  status: "active" | "inactive" | "banned" | "blocked";
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogs".
 */
export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  content: {
    [k: string]: unknown;
  }[];
  user: string | User;
  cover_image?: string | Media | null;
  published_at: string;
  status: "pending" | "published" | "rejected";
  tags?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "documents".
 */
export interface Document {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "glossaries".
 */
export interface Glossary {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "faqs".
 */
export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "articles".
 */
export interface Article {
  id: string;
  title: string;
  excerpt?: string | null;
  topic?:
    | (
        | "getting-started"
        | "travel-and-pay"
        | "earn-rewards"
        | "managing-your-crypto"
        | "stay-secure"
        | "get-support"
      )
    | null;
  tags?: string | null;
  content: {
    [k: string]: unknown;
  }[];
  user: string | User;
  helpfulCount?: number | null;
  published_at: string;
  updated_at: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "submissions".
 */
export interface Submission {
  id: string;
  name: string;
  email: string;
  topic:
    | "account-issues"
    | "wallet-connection"
    | "transaction-problems"
    | "booking-issues"
    | "rewards-and-staking"
    | "nft-and-exclusive-offers"
    | "security-concerns"
    | "technical-glitches"
    | "platform-navigation"
    | "other";
  priority: "low" | "medium" | "high" | "critical";
  description: string;
  created_at: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "transactions".
 */
export interface Transaction {
  id: string;
  transaction: string;
  billingUserAddress: string;
  billingUserName: string;
  amount: number;
  currency: "USDC" | "USDT";
  item: string;
  usdt: number;
  fft: number;
  comments: string;
  status?: ("Pending" | "Completed") | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "rewardsHistory".
 */
export interface RewardsHistory {
  id: string;
  claimedAt?: string | null;
  rewardID: string;
  rewardName: string;
  category: string;
  value: number;
  user: string | User;
  billingUserName: string;
  amount: number;
  currency: "USDC" | "USDT";
  item: string;
  usdt: number;
  fft: number;
  comments: string;
  status?: ("Pending" | "Completed") | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: "users";
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}

declare module "payload" {
  export interface GeneratedTypes extends Config {}
}